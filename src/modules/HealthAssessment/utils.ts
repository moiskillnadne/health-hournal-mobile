/* eslint-disable indent */
import { differenceInYears } from 'date-fns';

import { mergeDateAndTime } from '@app/utils';

import {
  HealthAssessmentState,
  Conditions,
  TellAboutHealth,
  AnswerMoreQuestions,
  NextDoctorsAppointment,
  TellAboutLifestyle,
  ScreeningTest,
  PapSmear,
  Mammogram,
  PersonalInformation,
} from './state/slice';
import { actions } from './state';
import { GENDER } from './constants';
import { Appointment } from './types';

const { setHeathAssessmentData } = actions;

export function changeHealthAssessment(key: string, data: any) {
  return setHeathAssessmentData({ key, data } as { key: keyof HealthAssessmentState; data: any });
}

export function getAge(date: string) {
  const age = differenceInYears(new Date(), new Date(date));

  return age;
}

function isTrue(value: string) {
  return value === 'true';
}

type SummaryData = {
  personalInformation: PersonalInformation;
  conditions: Conditions;
  info: TellAboutHealth;
  questions: AnswerMoreQuestions;
  appointments: NextDoctorsAppointment;
  lifestyle: TellAboutLifestyle;
  colon: ScreeningTest;
  papSmear: PapSmear;
  mammogram: Mammogram;
};

function hasMgDlorMmolL({ mgDl, mmolL }: { mgDl: string; mmolL: string }) {
  return Boolean(mgDl) || Boolean(mmolL);
}

export function getSummaryData({
  personalInformation,
  conditions,
  info,
  questions,
  appointments,
  lifestyle,
  colon,
  papSmear,
  mammogram,
}: SummaryData) {
  const age = getAge(personalInformation.dateOfBirth);

  const isFemale = personalInformation.gender === GENDER.FEMALE;

  return {
    conditions: conditions.conditions
      ?.filter(item => item.value)
      .map(item => ({ id: item.id, info: item.info })),

    info: {
      ...(info.lastDiabeticEyeExam && { lastDiabeticEyeExam: info.lastDiabeticEyeExam }),
      ...(info.nextDiabeticEyeExam && { nextDiabeticEyeExam: info.nextDiabeticEyeExam }),
      ...(!!info.goalHba1c && { goalHba1c: Number(info.goalHba1c) }),
      ...(hasMgDlorMmolL(info.goalRandomBloodSugar) && {
        goalRandomBloodSugar: {
          mgDl: Number(info.goalRandomBloodSugar.mgDl),
          mmolL: Number(info.goalRandomBloodSugar.mmolL),
        },
      }),
      ...(hasMgDlorMmolL(info.afterMealBloodSugar) && {
        afterMealBloodSugar: {
          mgDl: Number(info.afterMealBloodSugar.mgDl),
          mmolL: Number(info.afterMealBloodSugar.mmolL),
        },
      }),
      ...(hasMgDlorMmolL(info.fastingBloodSugar) && {
        fastingBloodSugar: {
          mgDl: Number(info.fastingBloodSugar.mgDl),
          mmolL: Number(info.fastingBloodSugar.mmolL),
        },
      }),
      ...(hasMgDlorMmolL(info.goalAfterMealBloodSugar) && {
        goalAfterMealBloodSugar: {
          mgDl: Number(info.goalAfterMealBloodSugar.mgDl),
          mmolL: Number(info.goalAfterMealBloodSugar.mmolL),
        },
      }),
      ...(hasMgDlorMmolL(info.goalFastingBloodSugar) && {
        goalFastingBloodSugar: {
          mgDl: Number(info.goalFastingBloodSugar.mgDl),
          mmolL: Number(info.goalFastingBloodSugar.mmolL),
        },
      }),
      ...(hasMgDlorMmolL(info.goalLdl) && {
        goalLdl: {
          mgDl: Number(info.goalLdl.mgDl),
          mmolL: Number(info.goalLdl.mmolL),
        },
      }),
      ...(hasMgDlorMmolL(info.randomBloodSugar) && {
        randomBloodSugar: {
          mgDl: Number(info.randomBloodSugar.mgDl),
          mmolL: Number(info.randomBloodSugar.mmolL),
        },
      }),
      ...(hasMgDlorMmolL(info.ldl) && {
        ldl: {
          mgDl: Number(info.ldl.mgDl),
          mmolL: Number(info.ldl.mmolL),
        },
      }),
      ...(info.hba1c.percent && {
        hba1c: {
          ...(info.hba1c.datetime && { datetime: info.hba1c.datetime }),
          percent: Number(info.hba1c.percent),
        },
      }),
      ...(hasMgDlorMmolL(info.triglyceride) && {
        triglyceride: {
          mgDl: Number(info.triglyceride.mgDl),
          mmolL: Number(info.triglyceride.mmolL),
        },
      }),
      ...(info.cpap && { cpap: isTrue(info.cpap) }),
      noDiabeticEyeExam: isTrue(info.noDiabeticEyeExam),
      remindDiabeticEyeExamInOneMonth: info.remindDiabeticEyeExamInOneMonth,
    },

    questions: {
      ...((questions.bloodPressure.diastolic || questions.bloodPressure.systolic) && {
        bloodPressure: {
          ...(questions.bloodPressure.datetime && { datetime: questions.bloodPressure.datetime }),
          diastolic: Number(questions.bloodPressure.diastolic),
          systolic: Number(questions.bloodPressure.systolic),
        },
      }),
      medications: questions.medications
        .filter(item => item.id)
        .map(item => ({
          id: item.id,
          frequency: Number(item.frequency),
          ...(item.period && { period: item.period }),
          amount: Number(item.amount?.replace(/,/g, '')),
          ...(item.currency && { currency: item.currency }),
        })),
      goalPressureSystolic: Number(questions.goalPressureSystolic),
      goalPressureDiastolic: Number(questions.goalPressureDiastolic),
      noBloodPressureCheck: questions.noBloodPressureCheck,
    },

    appointments: {
      appointments: appointments.appointmentAttached
        ? [getAppointment(appointments.appointment)]
        : [],
      needToScheduleAppointment: isTrue(appointments.needToScheduleAppointment),
      noScheduledAppointment: isTrue(appointments.noScheduledAppointment),
    },

    lifestyle: {
      averageDailyWaterIntake: Number(lifestyle.averageDailyWaterIntake),
      averageDailySleepHours: Number(lifestyle.averageDailySleepHours),
      sleepQualityRating: Number(lifestyle.sleepQualityRating),
      overallHealthRating: Number(lifestyle.overallHealthRating),
      hasDepressionOrAnxiety: isTrue(lifestyle.hasDepressionOrAnxiety),
      noAnswerOnDepressionOrAnxiety: isTrue(lifestyle.noAnswerOnDepressionOrAnxiety),
      reverseOrBetterManage: lifestyle.reverseOrBetterManage,
      loseWeight: lifestyle.loseWeight,
      improveLabWorkWithoutMedications: lifestyle.improveLabWorkWithoutMedications,
      feelBetter: lifestyle.feelBetter,
      lowerHealthcareCost: lifestyle.lowerHealthcareCost,
      decreaseOrGetOffMedications: lifestyle.decreaseOrGetOffMedications,
      none: lifestyle.none,
      money: lifestyle.money,
      time: lifestyle.time,
      energy: lifestyle.energy,
      socialLife: lifestyle.socialLife,
      unsureWhatToDo: lifestyle.unsureWhatToDo,
      emotionalConnectWithFoodDrinks: lifestyle.emotionalConnectWithFoodDrinks,
      liveHealthyLifestyle: lifestyle.liveHealthyLifestyle,
      ...(lifestyle.other && { other: lifestyle.other }),
    },

    ...(age >= 45 && {
      colon: {
        ...(colon.bloodStoolTesting.datetime && {
          bloodStoolTesting: {
            datetime: colon.bloodStoolTesting.datetime,
            ...(colon.bloodStoolTesting.repeatEnabled && {
              interval: +colon.bloodStoolTesting.frequency,
              period: colon.bloodStoolTesting.period,
            }),
          },
        }),
        ...(colon.cologuard.datetime && {
          cologuard: {
            datetime: colon.cologuard.datetime,
            ...(colon.cologuard.repeatEnabled && {
              interval: +colon.cologuard.frequency,
              period: colon.cologuard.period,
            }),
          },
        }),
        ...(colon.colonography.datetime && {
          colonography: {
            datetime: colon.colonography.datetime,
            ...(colon.colonography.repeatEnabled && {
              interval: +colon.colonography.frequency,
              period: colon.colonography.period,
            }),
          },
        }),
        ...(colon.colonoscopy.datetime && {
          colonoscopy: {
            datetime: colon.colonoscopy.datetime,
            ...(colon.colonoscopy.repeatEnabled && {
              interval: +colon.colonoscopy.frequency,
              period: colon.colonoscopy.period,
            }),
          },
        }),
        noColonScreening: isTrue(colon.noColonScreening),
        noNeedColonScreening: isTrue(colon.noNeedColonScreening),
        remindColonScreeningInThreeMonth: colon.remindColonScreeningInThreeMonth,
      },
    }),

    ...(isFemale &&
      age >= 21 && {
        papSmear: {
          ...(papSmear.papSmear.datetime && {
            papSmear: {
              datetime: papSmear.papSmear.datetime,
              ...(papSmear.papSmear.repeatEnabled && {
                interval: +papSmear.papSmear.frequency,
                period: papSmear.papSmear.period,
              }),
            },
          }),
          noNeedPapSmear: isTrue(papSmear.noNeedPapSmear),
          noPapSmear: isTrue(papSmear.noPapSmear),
          remindPapSmearInThreeMonth: papSmear.remindPapSmearInThreeMonth,
        },
      }),

    ...(isFemale &&
      age >= 40 && {
        mammogram: {
          ...(mammogram.mammogram.datetime && {
            mammogram: {
              datetime: mammogram.mammogram.datetime,
              ...(mammogram.mammogram.repeatEnabled && {
                interval: +mammogram.mammogram.frequency,
                period: mammogram.mammogram.period,
              }),
            },
          }),
          noMammogram: isTrue(mammogram.noMammogram),
          noNeedMammogram: isTrue(mammogram.noNeedMammogram),
          remindMammogramInThreeMonth: mammogram.remindMammogramInThreeMonth,
        },
      }),
  };
}

function getAppointment(appointment: Appointment) {
  const datetime = mergeDateAndTime(appointment.date, appointment.time);

  return {
    datetime,
    id: appointment.id,
    ...(appointment.doctor && {
      doctor: appointment.doctor,
    }),
    ...(appointment.speciality && {
      speciality: appointment.speciality,
    }),
  };
}
