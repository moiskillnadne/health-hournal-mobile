import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import store from '@app/state/store';
import { MeasurementUnit } from '@app/types';
import { changeMeasurementUnit, clear } from '@app/state';
import { MEASUREMENT_UNITS } from '@app/constants';

import { Appointment, Medication } from '../entities';
import { Appointment as TAppointment, Condition } from '../types';

export type HealthAssessmentState = {
  personalInformation: PersonalInformation;
  conditions: Conditions;
  info: TellAboutHealth;
  questions: AnswerMoreQuestions;
  appointments: NextDoctorsAppointment;
  appointment: TAppointment;
  lifestyle: TellAboutLifestyle;
  colon: ScreeningTest;
  papSmear: PapSmear;
  mammogram: Mammogram;
};

export type Mammogram = {
  mammogram: {
    datetime: string;
    repeatEnabled: boolean;
    frequency: string;
    period: string;
  };
  noMammogram: string;
  noNeedMammogram: string;
  remindMammogramInThreeMonth: false;
};

export type PapSmear = {
  papSmear: {
    datetime: string;
    repeatEnabled: boolean;
    frequency: string;
    period: string;
  };
  noPapSmear: string;
  noNeedPapSmear: string;
  remindPapSmearInThreeMonth: false;
};

export type TellAboutLifestyle = {
  averageDailyWaterIntake: string;
  averageDailySleepHours: string;
  sleepQualityRating: number;
  overallHealthRating: number;
  hasDepressionOrAnxiety: string;
  noAnswerOnDepressionOrAnxiety: string;
  reverseOrBetterManage: boolean;
  loseWeight: boolean;
  improveLabWorkWithoutMedications: boolean;
  feelBetter: boolean;
  lowerHealthcareCost: boolean;
  decreaseOrGetOffMedications: boolean;
  none: boolean;
  money: boolean;
  time: boolean;
  energy: boolean;
  socialLife: boolean;
  unsureWhatToDo: boolean;
  emotionalConnectWithFoodDrinks: boolean;
  liveHealthyLifestyle: boolean;
  other: string;
};

export type ScreeningTest = {
  bloodStoolTesting: {
    datetime: string;
    repeatEnabled: boolean;
    frequency: string;
    period: string;
  };
  cologuard: {
    datetime: string;
    repeatEnabled: boolean;
    frequency: string;
    period: string;
  };
  colonoscopy: {
    datetime: string;
    repeatEnabled: boolean;
    frequency: string;
    period: string;
  };
  colonography: {
    datetime: string;
    repeatEnabled: boolean;
    frequency: string;
    period: string;
  };
  noColonScreening: string;
  noNeedColonScreening: string;
  remindColonScreeningInThreeMonth: boolean;
};

export type Medication = {
  id: string;
  frequency?: string;
  period: string;
  amount?: string;
  currency: string;
  name: string;
};

export type NextDoctorsAppointment = {
  appointment: TAppointment;
  hasAppointment: string;
  needToScheduleAppointment: string;
  noScheduledAppointment: string;
  appointmentAttached: boolean;
};

export type AnswerMoreQuestions = {
  medications: Medication[];
  bloodPressure: {
    systolic: string;
    diastolic: string;
    datetime: string;
  };
  goalPressureSystolic: string;
  goalPressureDiastolic: string;
  noBloodPressureCheck: boolean;
};

export type TellAboutHealth = {
  lastDiabeticEyeExam: string;
  noDiabeticEyeExam: string;
  nextDiabeticEyeExam: string;
  remindDiabeticEyeExamInOneMonth: boolean;
  hba1c: {
    percent: string;
    datetime: string;
  };
  randomBloodSugar: {
    mgDl: string;
    mmolL: string;
  };
  fastingBloodSugar: {
    mgDl: string;
    mmolL: string;
  };
  afterMealBloodSugar: {
    mgDl: string;
    mmolL: string;
  };
  ldl: {
    mgDl: string;
    mmolL: string;
  };
  triglyceride: {
    mgDl: string;
    mmolL: string;
  };
  goalHba1c: string;
  goalRandomBloodSugar: {
    mgDl: string;
    mmolL: string;
  };
  goalFastingBloodSugar: {
    mgDl: string;
    mmolL: string;
  };
  goalAfterMealBloodSugar: {
    mgDl: string;
    mmolL: string;
  };
  goalLdl: {
    mgDl: string;
    mmolL: string;
  };
  cpap: string;
};

export type Conditions = {
  conditions: Maybe<Condition[]>;
};

export type PersonalInformation = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  state: string;
  country: string;
  weight: {
    lb: string;
    kg: string;
  };
  height: {
    cm: string;
    ft: string;
    in: string;
  };
  goalWeight: {
    lb: string;
    kg: string;
  };
  gender: string;
  genderId: string;
  raceId: string;
};

const initialState: HealthAssessmentState = {
  personalInformation: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    city: '',
    state: '',
    country: '',
    weight: {
      lb: '',
      kg: '',
    },
    height: {
      cm: '',
      ft: '',
      in: '',
    },
    goalWeight: {
      lb: '',
      kg: '',
    },
    gender: '',
    genderId: '',
    raceId: '',
  },
  conditions: {
    conditions: null,
  },
  info: {
    lastDiabeticEyeExam: '',
    noDiabeticEyeExam: 'false',
    nextDiabeticEyeExam: '',
    remindDiabeticEyeExamInOneMonth: false,
    hba1c: {
      percent: '',
      datetime: '',
    },
    randomBloodSugar: {
      mgDl: '',
      mmolL: '',
    },
    fastingBloodSugar: {
      mgDl: '',
      mmolL: '',
    },
    afterMealBloodSugar: {
      mgDl: '',
      mmolL: '',
    },
    ldl: {
      mgDl: '',
      mmolL: '',
    },
    triglyceride: {
      mgDl: '',
      mmolL: '',
    },
    goalHba1c: '',
    goalRandomBloodSugar: {
      mgDl: '',
      mmolL: '',
    },
    goalFastingBloodSugar: {
      mgDl: '',
      mmolL: '',
    },
    goalAfterMealBloodSugar: {
      mgDl: '',
      mmolL: '',
    },
    goalLdl: {
      mgDl: '',
      mmolL: '',
    },
    cpap: '',
  },
  questions: {
    medications: [Medication() as any],
    bloodPressure: {
      systolic: '',
      diastolic: '',
      datetime: '',
    },
    goalPressureSystolic: '',
    goalPressureDiastolic: '',
    noBloodPressureCheck: false,
  },
  appointments: {
    appointment: Appointment(),
    hasAppointment: 'false',
    needToScheduleAppointment: 'false',
    noScheduledAppointment: 'false',
    appointmentAttached: false,
  },
  appointment: Appointment(),
  lifestyle: {
    averageDailyWaterIntake: '',
    averageDailySleepHours: '',
    sleepQualityRating: 5,
    overallHealthRating: 5,
    hasDepressionOrAnxiety: 'false',
    noAnswerOnDepressionOrAnxiety: '',
    reverseOrBetterManage: false,
    loseWeight: false,
    improveLabWorkWithoutMedications: false,
    feelBetter: false,
    lowerHealthcareCost: false,
    decreaseOrGetOffMedications: false,
    none: false,
    money: false,
    time: false,
    energy: false,
    socialLife: false,
    unsureWhatToDo: false,
    emotionalConnectWithFoodDrinks: false,
    liveHealthyLifestyle: false,
    other: '',
  },
  colon: {
    bloodStoolTesting: {
      datetime: '',
      repeatEnabled: false,
      frequency: '',
      period: '',
    },
    cologuard: {
      datetime: '',
      repeatEnabled: false,
      frequency: '',
      period: '',
    },
    colonoscopy: {
      datetime: '',
      repeatEnabled: false,
      frequency: '',
      period: '',
    },
    colonography: {
      datetime: '',
      repeatEnabled: false,
      frequency: '',
      period: '',
    },
    noColonScreening: '',
    noNeedColonScreening: '',
    remindColonScreeningInThreeMonth: false,
  },
  papSmear: {
    papSmear: {
      datetime: '',
      repeatEnabled: false,
      frequency: '',
      period: '',
    },
    noPapSmear: '',
    noNeedPapSmear: '',
    remindPapSmearInThreeMonth: false,
  },
  mammogram: {
    mammogram: {
      datetime: '',
      repeatEnabled: false,
      frequency: '',
      period: '',
    },
    noMammogram: '',
    noNeedMammogram: '',
    remindMammogramInThreeMonth: false,
  },
};

const slice = createSlice({
  name: 'healthAssessment',
  initialState: initialState,
  reducers: {
    setHeathAssessmentData: (
      state,
      {
        payload,
      }: PayloadAction<{
        key: keyof HealthAssessmentState;
        data: any;
      }>,
    ) => {
      state[payload.key] = payload.data;
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(clear, () => {
        return initialState;
      })
      .addCase(changeMeasurementUnit, (state, action: PayloadAction<MeasurementUnit>) => {
        if (state.personalInformation.height) {
          if (action.payload === MEASUREMENT_UNITS.USA) {
            state.personalInformation.height.cm = '';
          } else {
            state.personalInformation.height.ft = '';
            state.personalInformation.height.in = '';
          }
        }
        if (state.personalInformation.weight) {
          if (action.payload === MEASUREMENT_UNITS.USA) {
            state.personalInformation.weight.kg = '';
          } else {
            state.personalInformation.weight.lb = '';
          }
        }
      });
  },
});

store.injectReducer(slice.name, slice.reducer);

export default slice;
