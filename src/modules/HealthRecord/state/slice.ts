import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { systemApi, clear } from '@app/state';
import store from '@app/state/store';

import { Medication, Appointment } from '../entities';
import { Medication as TMedication, AppointmentEditorForm as TAppointment } from '../types';
import { api } from './api';

export type Weight = {
  lb?: number;
  kg?: number;
};

type BloodSugar = {
  mgDl: number | undefined;
  mmolL: number | undefined;
};

type Cholesterol = {
  mgDl: number | undefined;
  mmolL: number | undefined;
};

export type BloodPressure = {
  systolic: number;
  diastolic: number;
};

type WeightSection = {
  weight: Weight & { datetime: string };
  goalWeight: Weight;
};

type UserBloodPressure = {
  systolic: number | undefined;
  diastolic: number | undefined;
  datetime: string;
  goalPressureSystolic: number | undefined;
  goalPressureDiastolic: number | undefined;
};

export type UserBloodSugar = {
  goalBloodSugar: BloodSugar;
  bloodSugar: BloodSugar & { datetime: string };
};

export type UserHbA1c = {
  hba1c: {
    percent: number | undefined;
    datetime: string;
  };
  goalHba1c: number | undefined;
};

export type UserCholesterol = {
  goalCholesterol: Cholesterol;
  cholesterol: Cholesterol & { datetime: string };
};

export type HealthRecordState = {
  medication: TMedication;

  weight: WeightSection;

  bloodPressure: UserBloodPressure;

  bloodSugar: {
    random: UserBloodSugar;
    fasting: UserBloodSugar;
    afterMeal: UserBloodSugar;
  };

  hba1c: UserHbA1c;

  cholesterol: {
    ldl: UserCholesterol;
    triglycerides: UserCholesterol;
  };

  condition: {
    id: string;
    info?: string;
  };

  additionalInfo: {
    value: string;
  };

  procedure: {
    id: string;
    name?: string;
    date: string;
    time: string;
    repeatEnabled: boolean;
    frequency?: string;
    period?: string;
  };

  appointment: TAppointment;
};

const initialState: HealthRecordState = {
  medication: Medication(),

  weight: {
    weight: {
      lb: undefined,
      kg: undefined,
      datetime: '',
    },
    goalWeight: {
      lb: undefined,
      kg: undefined,
    },
  },

  bloodPressure: {
    systolic: undefined,
    diastolic: undefined,
    datetime: '',
    goalPressureSystolic: undefined,
    goalPressureDiastolic: undefined,
  },

  bloodSugar: {
    random: {
      goalBloodSugar: {
        mgDl: undefined,
        mmolL: undefined,
      },
      bloodSugar: {
        mgDl: undefined,
        mmolL: undefined,
        datetime: '',
      },
    },
    fasting: {
      goalBloodSugar: {
        mgDl: undefined,
        mmolL: undefined,
      },
      bloodSugar: {
        mgDl: undefined,
        mmolL: undefined,
        datetime: '',
      },
    },
    afterMeal: {
      goalBloodSugar: {
        mgDl: undefined,
        mmolL: undefined,
      },
      bloodSugar: {
        mgDl: undefined,
        mmolL: undefined,
        datetime: '',
      },
    },
  },

  hba1c: {
    hba1c: {
      percent: undefined,
      datetime: '',
    },
    goalHba1c: undefined,
  },

  cholesterol: {
    ldl: {
      goalCholesterol: {
        mgDl: undefined,
        mmolL: undefined,
      },
      cholesterol: {
        mgDl: undefined,
        mmolL: undefined,
        datetime: '',
      },
    },
    triglycerides: {
      goalCholesterol: {
        mgDl: undefined,
        mmolL: undefined,
      },
      cholesterol: {
        mgDl: undefined,
        mmolL: undefined,
        datetime: '',
      },
    },
  },

  condition: {
    id: '',
    info: undefined,
  },

  additionalInfo: {
    value: '',
  },

  procedure: {
    id: '',
    name: undefined,
    date: '',
    time: '',
    repeatEnabled: false,
  },

  appointment: Appointment(),
};

const slice = createSlice({
  name: 'healthRecord',
  initialState: initialState,
  reducers: {
    weightAdded: (state, action: PayloadAction<WeightSection>) => {
      state.weight = action.payload;
    },
    additionalInfoAdded: (state, action: PayloadAction<string>) => {
      state.additionalInfo.value = action.payload;
    },
    bloodPressureAdded: (state, action: PayloadAction<UserBloodPressure>) => {
      state.bloodPressure = action.payload;
    },
    randomBloodSugarAdded: (state, action: PayloadAction<UserBloodSugar>) => {
      state.bloodSugar.random = action.payload;
    },
    fastingBloodSugarAdded: (state, action: PayloadAction<UserBloodSugar>) => {
      state.bloodSugar.fasting = action.payload;
    },
    afterMealBloodSugarAdded: (state, action: PayloadAction<UserBloodSugar>) => {
      state.bloodSugar.afterMeal = action.payload;
    },
    hba1cAdded: (state, action: PayloadAction<UserHbA1c>) => {
      state.hba1c = action.payload;
    },
    ldlAdded: (state, action: PayloadAction<UserCholesterol>) => {
      state.cholesterol.ldl = action.payload;
    },
    triglyceridesAdded: (state, action: PayloadAction<UserCholesterol>) => {
      state.cholesterol.triglycerides = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(clear, () => {
        return initialState;
      })
      .addMatcher(systemApi.endpoints.fetchLastWeight.matchFulfilled, (state, action) => {
        const { goalWeightKg, goalWeightLb, weightKg, weightLb, datetime } = action.payload;

        const data: WeightSection = {
          weight: {
            kg: weightKg,
            lb: weightLb,
            datetime,
          },
          goalWeight: {
            kg: goalWeightKg,
            lb: goalWeightLb,
          },
        };

        state.weight = data;
      })
      .addMatcher(api.endpoints.fetchAdditionalInfo.matchFulfilled, (state, action) => {
        state.additionalInfo.value = action.payload?.value ?? '';
      })
      .addMatcher(api.endpoints.fetchLastBloodPressure.matchFulfilled, (state, action) => {
        const {
          goalPressureSystolicMmHg,
          goalPressureDiastolicMmHg,
          pressureSystolicMmHg,
          pressureDiastolicMmHg,
          datetime,
        } = action.payload;

        state.bloodPressure = {
          systolic: pressureSystolicMmHg,
          diastolic: pressureDiastolicMmHg,
          datetime,
          goalPressureSystolic: goalPressureSystolicMmHg,
          goalPressureDiastolic: goalPressureDiastolicMmHg,
        };
      })
      .addMatcher(api.endpoints.fetchLastRandomBloodSugar.matchFulfilled, (state, action) => {
        const {
          goalRandomBloodSugarMgDl,
          goalRandomBloodSugarMmolL,
          sugarMgDl,
          sugarMmolL,
          datetime,
        } = action.payload;

        state.bloodSugar.random = {
          bloodSugar: {
            mgDl: sugarMgDl,
            mmolL: sugarMmolL,
            datetime,
          },
          goalBloodSugar: {
            mgDl: goalRandomBloodSugarMgDl,
            mmolL: goalRandomBloodSugarMmolL,
          },
        };
      })
      .addMatcher(api.endpoints.fetchLastFastingBloodSugar.matchFulfilled, (state, action) => {
        const {
          goalFastingBloodSugarMgDl,
          goalFastingBloodSugarMmolL,
          sugarMgDl,
          sugarMmolL,
          datetime,
        } = action.payload;

        state.bloodSugar.fasting = {
          bloodSugar: {
            mgDl: sugarMgDl,
            mmolL: sugarMmolL,
            datetime,
          },
          goalBloodSugar: {
            mgDl: goalFastingBloodSugarMgDl,
            mmolL: goalFastingBloodSugarMmolL,
          },
        };
      })
      .addMatcher(api.endpoints.fetchLastAfterMealBloodSugar.matchFulfilled, (state, action) => {
        const {
          goalAfterMealBloodSugarMgDl,
          goalAfterMealBloodSugarMmolL,
          sugarMgDl,
          sugarMmolL,
          datetime,
        } = action.payload;

        state.bloodSugar.afterMeal = {
          bloodSugar: {
            mgDl: sugarMgDl,
            mmolL: sugarMmolL,
            datetime,
          },
          goalBloodSugar: {
            mgDl: goalAfterMealBloodSugarMgDl,
            mmolL: goalAfterMealBloodSugarMmolL,
          },
        };
      })
      .addMatcher(api.endpoints.fetchLastHba1c.matchFulfilled, (state, action) => {
        const { hba1c, goalHba1c, datetime } = action.payload;

        state.hba1c = {
          hba1c: {
            percent: hba1c,
            datetime,
          },
          goalHba1c,
        };
      })
      .addMatcher(api.endpoints.fetchLastLdl.matchFulfilled, (state, action) => {
        const { ldlMgDl, ldlMmolL, goalLdlMgDl, goalLdlMmolL, datetime } = action.payload;

        state.cholesterol.ldl = {
          cholesterol: {
            mgDl: ldlMgDl,
            mmolL: ldlMmolL,
            datetime,
          },
          goalCholesterol: {
            mgDl: goalLdlMgDl,
            mmolL: goalLdlMmolL,
          },
        };
      })
      .addMatcher(api.endpoints.fetchLastTriglyceride.matchFulfilled, (state, action) => {
        const {
          triglycerideMgDl,
          triglycerideMmolL,
          goalTriglycerideMgDl,
          goalTriglycerideMmolL,
          datetime,
        } = action.payload;

        state.cholesterol.triglycerides = {
          cholesterol: {
            mgDl: triglycerideMgDl,
            mmolL: triglycerideMmolL,
            datetime,
          },
          goalCholesterol: {
            mgDl: goalTriglycerideMgDl,
            mmolL: goalTriglycerideMmolL,
          },
        };
      }),
});

store.injectReducer(slice.name, slice.reducer);

export default slice;
