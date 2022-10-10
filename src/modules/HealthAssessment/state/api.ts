import { baseApi } from '@app/state';
import { IdName, LabelValue } from '@app/types';

type Weight = {
  lb?: string;
  kg?: string;
};

type Procedure = {
  datetime: string;
  interval: number;
  period: string;
};

export type SavePersonalInfoRequest = {
  firstName: string;
  lastName?: string;
  companyCode?: string;
  dateOfBirth: string;
  genderId: string;
  raceId: string;
  city: string;
  state: string;
  country: string;
  height: {
    ft?: string;
    in?: string;
    cm?: string;
  };
  goalWeight: Weight;
  weight: Weight;
};

type Condition = { id: string; info: string };

export type SaveHealthAssessmentRequest = {
  conditions?: Condition[];
  info: {
    goalHba1c: number;
    goalRandomBloodSugar: {
      mgDl: number;
      mmolL: number;
    };
    goalFastingBloodSugar: {
      mgDl: number;
      mmolL: number;
    };
    goalAfterMealBloodSugar: {
      mgDl: number;
      mmolL: number;
    };
    goalLdl: {
      mgDl: number;
      mmolL: number;
    };
    cpap?: boolean;
    noDiabeticEyeExam: boolean;
    lastDiabeticEyeExam?: string;
    nextDiabeticEyeExam?: string;
    hba1c?: {
      percent: number;
      datetime?: string;
    };
    randomBloodSugar: {
      mgDl: number;
      mmolL: number;
    };
    fastingBloodSugar: {
      mgDl: number;
      mmolL: number;
    };
    afterMealBloodSugar: {
      mgDl: number;
      mmolL: number;
    };
    ldl: {
      mgDl: number;
      mmolL: number;
    };
    triglyceride: {
      mgDl: number;
      mmolL: number;
    };
    remindDiabeticEyeExamInOneMonth: boolean;
  };
  questions: {
    medications: {
      id: Maybe<string>;
      frequency?: Maybe<number>;
      period?: Maybe<string>;
      amount?: Maybe<number>;
      currency?: Maybe<string>;
    }[];
    goalPressureSystolic: number;
    goalPressureDiastolic: number;
    bloodPressure?: {
      systolic?: number;
      diastolic?: number;
      datetime?: string;
    };
    noBloodPressureCheck: boolean;
  };
  appointments: {
    appointments: {
      id: string;
      speciality?: string;
      doctor?: string;
      date: string;
      time: string;
    }[];
    needToScheduleAppointment: boolean;
    noScheduledAppointment: boolean;
  };
  colon?: {
    bloodStoolTesting?: Procedure;
    cologuard?: Procedure;
    colonoscopy?: Procedure;
    colonography?: Procedure;
    remindColonScreeningInThreeMonth: boolean;
    noColonScreening: boolean;
    noNeedColonScreening: boolean;
  };
  lifestyle: {
    averageDailyWaterIntake: number;
    averageDailySleepHours: number;
    sleepQualityRating: number;
    overallHealthRating: number;
    hasDepressionOrAnxiety: boolean;
    noAnswerOnDepressionOrAnxiety: boolean;
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
    other?: string;
  };
  papSmear?: {
    papSmear?: Procedure;
    remindPapSmearInThreeMonth: boolean;
    noPapSmear: boolean;
    noNeedPapSmear: boolean;
  };
  mammogram?: {
    mammogram?: Procedure;
    remindMammogramInThreeMonth: boolean;
    noMammogram: boolean;
    noNeedMammogram: boolean;
  };
};

export const api = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchRecurrence: builder.query<LabelValue[], string>({
      transformResponse: (response: LabelValue<number>[]): LabelValue[] =>
        response.map(item => ({ label: item.label, value: String(item.value) })),
      query: procedure => ({
        url: `user/procedures/recurrence/${procedure}`,
        method: 'GET',
      }),
    }),

    savePersonalInfo: builder.mutation<undefined, SavePersonalInfoRequest>({
      query: body => ({
        url: 'assessment/personal',
        method: 'POST',
        body,
      }),
    }),

    saveHealthAssessment: builder.mutation<undefined, SaveHealthAssessmentRequest>({
      query: body => ({
        url: 'assessment/summary',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: __DEV__,
});
