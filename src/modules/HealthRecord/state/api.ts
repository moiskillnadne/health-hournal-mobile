import { checkInternetConnection } from 'react-native-offline';
import { isToday } from 'date-fns';

import { baseApi } from '@app/state';
import { LabelValue, ListQueryParameters, ListQueryResponse } from '@app/types';

import { TimeUnit } from '../types';

import { Weight, BloodPressure } from './slice';
import { actions } from './';

type MedicationResponse = {
  amount: number;
  currency: string;
  dose: string;
  frequency: number;
  id: string;
  medicationProductId: string;
  name: string;
  period: string;
  status: string;
  statusUpdated: string;
}[];

type MedicationTransformedResponse = {
  amount: string;
  currency: string;
  dose: string;
  frequency: string;
  id: string;
  medicationProductId: string;
  name: string;
  period: string;
  status: string;
  needMedicationAgain: false;
  statusUpdated: string;
}[];

export type AddMedicationRequest = {
  id: string;
  frequency: number;
  period: string;
  amount?: number;
  currency?: string;
}[];

export type UpdateMedicationRequest = {
  id: string;
  body: {
    id?: string;
    frequency: number;
    period: Maybe<string>;
    amount: Maybe<number>;
    currency: string;
    status: string;
  };
};

export type AddWeightRequest = {
  weight: Weight & { datetime: string };
  goalWeight: Weight;
};

export type LastBloodPressureResponse = {
  id: string;
  goalPressureSystolicMmHg: number;
  goalPressureDiastolicMmHg: number;
  pressureSystolicMmHg: number;
  pressureDiastolicMmHg: number;
  datetime: string;
};

export type AddBloodPressureRequest = {
  systolic: number;
  diastolic: number;
  datetime: string;
  goalPressureSystolic?: number;
  goalPressureDiastolic?: number;
};

export type LastRandomBloodSugarResponse = {
  id: string;
  goalRandomBloodSugarMgDl: number;
  goalRandomBloodSugarMmolL: number;
  sugarMgDl: number;
  sugarMmolL: number;
  datetime: string;
};

export type BloodSugar = {
  mgDl: number | undefined;
  mmolL: number | undefined;
};

export type AddRandomBloodSugarRequest = {
  goalRandomBloodSugar: BloodSugar;
  randomBloodSugar: BloodSugar & { datetime: string };
};

export type LastFastingBloodSugarResponse = {
  id: string;
  goalFastingBloodSugarMgDl: number;
  goalFastingBloodSugarMmolL: number;
  sugarMgDl: number;
  sugarMmolL: number;
  datetime: string;
};

export type AddFastingBloodSugarRequest = {
  goalFastingBloodSugar: BloodSugar;
  fastingBloodSugar: BloodSugar & { datetime: string };
};

export type LastAfterMealBloodSugarResponse = {
  id: string;
  goalAfterMealBloodSugarMgDl: number;
  goalAfterMealBloodSugarMmolL: number;
  sugarMgDl: number;
  sugarMmolL: number;
  datetime: string;
};

export type AddAfterMealBloodSugarRequest = {
  goalAfterMealBloodSugar: BloodSugar;
  afterMealBloodSugar: BloodSugar & { datetime: string };
};

export type LastHba1cResponse = {
  id: string;
  goalHba1c: number;
  hba1c: number;
  datetime: string;
};

export type Hba1c = {
  percent: number;
};

export type AddHba1cRequest = {
  hba1c: {
    percent: number;
    datetime: string;
  };
  goalHba1c: number | undefined;
};

export type LastLdlResponse = {
  id: string;
  goalLdlMgDl: number;
  goalLdlMmolL: number;
  ldlMgDl: number;
  ldlMmolL: number;
  datetime: string;
};

export type Cholesterol = {
  mgDl: number | undefined;
  mmolL: number | undefined;
};

export type AddLdlRequest = {
  ldl: Cholesterol & { datetime: string };
  goalLdl: Cholesterol;
};

export type LastTriglycerideResponse = {
  id: string;
  goalTriglycerideMgDl: number;
  goalTriglycerideMmolL: number;
  triglycerideMgDl: number;
  triglycerideMmolL: number;
  datetime: string;
};

export type AddTriglycerideRequest = {
  triglyceride: Cholesterol & { datetime: string };
  goalTriglyceride: Cholesterol;
};

export type AnalyticsRequest = {
  period: TimeUnit;
};

export type AnalyticsChunk<T> = {
  value: T;
  datetime: string;
};

export type AnalyticsResponse<T> = AnalyticsChunk<T>[];

export type Condition = {
  conditionResolvedDate: Maybe<string>;
  createAt: string;
  id: string;
  info: Maybe<string>;
  name: string;
  status: string;
  userId: string;
};

export type AddConditionRequest = {
  id: string;
  info?: string;
}[];

export type ResolveConditionRequest = {
  conditionId: string;
};

export type AdditionalInfoResponse = {
  value?: string;
};

export type UpdateAdditionInfoRequest = {
  value: string;
};

export type ProceduresResponse = {
  id: string;
  name: string;
  description: Maybe<string>;
  tag: string;
  period: string;
  interval: string;
}[];

export type FrequencyResponse = {
  label: number;
  value: number;
}[];

export type AddProcedureRequest = {
  id: string;
  name?: string;
  datetime: string;
  interval?: number;
  period?: string;
};

export type UpdateProcedureRequest = {
  id: string;
  procedureId: string;
  name?: string;
  datetime: string;
  interval?: number;
  period?: string;
};

type AddAppointmentRequest = {
  id: string;
  speciality: Maybe<string>;
  doctor: Maybe<string>;
  datetime: string;
}[];

type UpdateAppointmentRequest = {
  id: string;
  appointmentId: string;
  speciality: Maybe<string>;
  doctor: Maybe<string>;
  datetime: string;
};

type ProcedureEntity = Omit<ProcedureResponse, 'interval'> & {
  interval?: Maybe<string>;
  repeatEnabled: boolean;
};

type ProcedureResponse = {
  datetime: string;
  id: string;
  name: Maybe<string>;
  procedureId: string;
  interval: Maybe<number>;
  period: Maybe<string>;
};

type AppointmentEntity = {
  appointmentId: string;
  datetime: string;
  doctor: string;
  id: string;
  speciality: Maybe<string>;
  userId: string;
};

export const api = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      'Medications-List',
      'Weight-Last',
      'Weight-List',
      'BloodPressure-Last',
      'BloodPressure-List',
      'BloodSugar-List',
      'RandomBloodSugar-List',
      'FastingBloodSugar-List',
      'AfterMealBloodSugar-List',
      'RandomBloodSugar-Last',
      'FastingBloodSugar-Last',
      'AfterMealBloodSugar-Last',
      'Hba1c-Last',
      'Hba1c-List',
      'Ldl-Last',
      'Triglyceride-Last',
      'ConditionsCurrent-List',
      'ConditionsResolved-List',
      'AdditionalInfo-List',
      'Events-List',
      'Ldl-List',
      'Triglycerides-List',
      'Notifications-Count',
    ],
  })
  .injectEndpoints({
    endpoints: builder => ({
      fetchUserMedications: builder.query<MedicationTransformedResponse, string>({
        transformResponse: (response: MedicationResponse): MedicationTransformedResponse =>
          response.map(item => ({
            ...item,
            frequency: item.frequency ? String(item.frequency) : '',
            amount: item.amount ? String(item.amount) : '',
            needMedicationAgain: false,
          })),
        query: status => ({
          url: `user/medications?status=${status}`,
          method: 'GET',
        }),
        providesTags: ['Medications-List'],
      }),

      addMedication: builder.mutation<undefined, AddMedicationRequest>({
        query: body => ({
          url: 'user/medications',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Medications-List', 'Notifications-Count'],
      }),

      removeMedication: builder.mutation<undefined, string>({
        query: id => ({
          url: `user/medications/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Medications-List', 'Notifications-Count'],
      }),

      updateMedication: builder.mutation<undefined, UpdateMedicationRequest>({
        query: data => ({
          url: `user/medications/${data.id}`,
          method: 'PATCH',
          body: data.body,
        }),
        invalidatesTags: ['Medications-List', 'Notifications-Count'],
      }),

      fetchWeight: builder.query<AnalyticsResponse<Weight>, AnalyticsRequest>({
        query: params => ({
          url: 'user/weight',
          method: 'GET',
          params,
        }),
        providesTags: ['Weight-List'],
      }),

      addWeight: builder.mutation<undefined, AddWeightRequest>({
        query: body => ({
          url: 'user/weight',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['Weight-Last', 'Weight-List', 'Notifications-Count'],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.weight.datetime));

            if (!isOnline && isTodayMutation) {
              dispatch(actions.weightAdded(patch));
            }
          });
        },
      }),

      fetchBloodPressure: builder.query<AnalyticsResponse<BloodPressure>, AnalyticsRequest>({
        query: params => ({
          url: 'user/pressure',
          method: 'GET',
          params,
        }),
        providesTags: ['BloodPressure-List'],
      }),

      fetchLastBloodPressure: builder.query<LastBloodPressureResponse, void>({
        query: () => ({
          url: 'user/pressure/latest',
          method: 'GET',
        }),
        providesTags: ['BloodPressure-Last'],
      }),

      addBloodPressure: builder.mutation<undefined, AddBloodPressureRequest>({
        query: body => ({
          url: 'user/pressure',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['BloodPressure-Last', 'BloodPressure-List', 'Notifications-Count'],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.datetime));

            if (!isOnline && isTodayMutation) {
              dispatch(
                actions.bloodPressureAdded({
                  ...patch,
                  goalPressureDiastolic: patch.goalPressureDiastolic,
                  goalPressureSystolic: patch.goalPressureSystolic,
                }),
              );
            }
          });
        },
      }),

      fetchRandomBloodSugar: builder.query<AnalyticsResponse<BloodSugar>, AnalyticsRequest>({
        query: params => ({
          url: 'user/random-blood-sugar',
          method: 'GET',
          params,
        }),
        providesTags: ['RandomBloodSugar-List'],
      }),

      fetchFastingBloodSugar: builder.query<AnalyticsResponse<BloodSugar>, AnalyticsRequest>({
        query: params => ({
          url: 'user/fasting-blood-sugar',
          method: 'GET',
          params,
        }),
        providesTags: ['FastingBloodSugar-List'],
      }),

      fetchAfterMealBloodSugar: builder.query<AnalyticsResponse<BloodSugar>, AnalyticsRequest>({
        query: params => ({
          url: 'user/after-meal-blood-sugar',
          method: 'GET',
          params,
        }),
        providesTags: ['AfterMealBloodSugar-List'],
      }),

      fetchLastRandomBloodSugar: builder.query<LastRandomBloodSugarResponse, void>({
        query: () => ({
          url: 'user/random-blood-sugar/latest',
          method: 'GET',
        }),
        providesTags: ['RandomBloodSugar-Last'],
      }),

      addRandomBloodSugar: builder.mutation<undefined, AddRandomBloodSugarRequest>({
        query: body => ({
          url: 'user/random-blood-sugar',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['RandomBloodSugar-Last', 'RandomBloodSugar-List', 'Notifications-Count'],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.randomBloodSugar.datetime));

            if (!isOnline && isTodayMutation) {
              const { randomBloodSugar, goalRandomBloodSugar } = patch;

              dispatch(
                actions.randomBloodSugarAdded({
                  bloodSugar: {
                    mgDl: randomBloodSugar.mgDl,
                    mmolL: randomBloodSugar.mmolL,
                    datetime: randomBloodSugar.datetime,
                  },
                  goalBloodSugar: {
                    mgDl: goalRandomBloodSugar.mgDl,
                    mmolL: goalRandomBloodSugar.mmolL,
                  },
                }),
              );
            }
          });
        },
      }),

      fetchLastFastingBloodSugar: builder.query<LastFastingBloodSugarResponse, void>({
        query: () => ({
          url: 'user/fasting-blood-sugar/latest',
          method: 'GET',
        }),
        providesTags: ['FastingBloodSugar-Last'],
      }),

      addFastingBloodSugar: builder.mutation<undefined, AddFastingBloodSugarRequest>({
        query: body => ({
          url: 'user/fasting-blood-sugar',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: [
          'FastingBloodSugar-Last',
          'FastingBloodSugar-List',
          'Notifications-Count',
        ],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.fastingBloodSugar.datetime));

            if (!isOnline && isTodayMutation) {
              const { fastingBloodSugar, goalFastingBloodSugar } = patch;

              dispatch(
                actions.fastingBloodSugarAdded({
                  bloodSugar: {
                    mgDl: fastingBloodSugar.mgDl,
                    mmolL: fastingBloodSugar.mmolL,
                    datetime: fastingBloodSugar.datetime,
                  },
                  goalBloodSugar: {
                    mgDl: goalFastingBloodSugar.mgDl,
                    mmolL: goalFastingBloodSugar.mmolL,
                  },
                }),
              );
            }
          });
        },
      }),

      fetchLastAfterMealBloodSugar: builder.query<LastAfterMealBloodSugarResponse, void>({
        query: () => ({
          url: 'user/after-meal-blood-sugar/latest',
        }),
        providesTags: ['AfterMealBloodSugar-Last'],
      }),

      addAfterMealBloodSugar: builder.mutation<undefined, AddAfterMealBloodSugarRequest>({
        query: body => ({
          url: 'user/after-meal-blood-sugar',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: [
          'AfterMealBloodSugar-Last',
          'AfterMealBloodSugar-List',
          'Notifications-Count',
        ],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.afterMealBloodSugar.datetime));

            if (!isOnline && isTodayMutation) {
              const { afterMealBloodSugar, goalAfterMealBloodSugar } = patch;

              dispatch(
                actions.afterMealBloodSugarAdded({
                  bloodSugar: {
                    mgDl: afterMealBloodSugar.mgDl,
                    mmolL: afterMealBloodSugar.mmolL,
                    datetime: afterMealBloodSugar.datetime,
                  },
                  goalBloodSugar: {
                    mgDl: goalAfterMealBloodSugar.mgDl,
                    mmolL: goalAfterMealBloodSugar.mmolL,
                  },
                }),
              );
            }
          });
        },
      }),

      fetchHba1c: builder.query<AnalyticsResponse<Hba1c>, AnalyticsRequest>({
        query: params => ({
          url: 'user/hba1c',
          method: 'GET',
          params,
        }),
        providesTags: ['Hba1c-List'],
      }),

      fetchLastHba1c: builder.query<LastHba1cResponse, void>({
        query: () => ({
          url: 'user/hba1c/latest',
        }),
        providesTags: ['Hba1c-Last'],
      }),

      addHba1c: builder.mutation<undefined, AddHba1cRequest>({
        query: body => ({
          url: 'user/hba1c',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['Hba1c-Last', 'Hba1c-List', 'Notifications-Count'],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.hba1c.datetime));

            if (!isOnline && isTodayMutation) {
              dispatch(actions.hba1cAdded(patch));
            }
          });
        },
      }),

      fetchLastLdl: builder.query<LastLdlResponse, void>({
        query: () => ({
          url: 'user/ldl/latest',
        }),
        providesTags: ['Ldl-Last'],
      }),

      addLdl: builder.mutation<undefined, AddLdlRequest>({
        query: body => ({
          url: 'user/ldl',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['Ldl-Last', 'Ldl-List', 'Notifications-Count'],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.ldl.datetime));

            if (!isOnline && isTodayMutation) {
              dispatch(
                actions.ldlAdded({
                  cholesterol: {
                    mgDl: patch.ldl.mgDl,
                    mmolL: patch.ldl.mmolL,
                    datetime: patch.ldl.datetime,
                  },
                  goalCholesterol: {
                    mgDl: patch.goalLdl.mgDl,
                    mmolL: patch.goalLdl.mmolL,
                  },
                }),
              );
            }
          });
        },
      }),

      fetchLastTriglyceride: builder.query<LastTriglycerideResponse, void>({
        query: () => ({
          url: 'user/triglyceride/latest',
        }),
        providesTags: ['Triglyceride-Last'],
      }),

      addTriglyceride: builder.mutation<undefined, AddTriglycerideRequest>({
        query: body => ({
          url: 'user/triglyceride',
          method: 'POST',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['Triglyceride-Last', 'Triglycerides-List', 'Notifications-Count'],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            const isTodayMutation = isToday(new Date(patch.triglyceride.datetime));

            if (!isOnline && isTodayMutation) {
              dispatch(
                actions.triglyceridesAdded({
                  cholesterol: {
                    mgDl: patch.triglyceride.mgDl,
                    mmolL: patch.triglyceride.mmolL,
                    datetime: patch.triglyceride.datetime,
                  },
                  goalCholesterol: {
                    mgDl: patch.goalTriglyceride.mgDl,
                    mmolL: patch.goalTriglyceride.mmolL,
                  },
                }),
              );
            }
          });
        },
      }),

      fetchUserCurrentConditions: builder.query<Condition[], void>({
        query: () => ({
          url: 'user/conditions/current',
          method: 'GET',
        }),
        providesTags: ['ConditionsCurrent-List'],
      }),

      fetchUserResolvedConditions: builder.query<
        ListQueryResponse<Condition[]>,
        ListQueryParameters
      >({
        query: params => ({
          url: 'user/conditions/resolved',
          method: 'GET',
          params,
        }),
        providesTags: ['ConditionsResolved-List'],
      }),

      addCondition: builder.mutation<undefined, AddConditionRequest>({
        query: body => ({
          url: 'user/conditions',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['ConditionsCurrent-List', 'Notifications-Count'],
      }),

      resolveCondition: builder.mutation<undefined, ResolveConditionRequest>({
        query: body => ({
          url: 'user/conditions/resolve',
          method: 'PATCH',
          body,
        }),
        invalidatesTags: [
          'ConditionsCurrent-List',
          'ConditionsResolved-List',
          'Notifications-Count',
        ],
      }),

      fetchAdditionalInfo: builder.query<AdditionalInfoResponse, void>({
        query: () => ({
          url: 'user/additional-information',
        }),
        providesTags: ['AdditionalInfo-List'],
      }),

      updateAdditionInfo: builder.mutation<undefined, UpdateAdditionInfoRequest>({
        query: body => ({
          url: 'user/additional-information',
          method: 'PUT',
          body,
          headers: {
            offline: 'true',
          },
        }),
        invalidatesTags: ['AdditionalInfo-List', 'Notifications-Count'],
        onQueryStarted: (patch, { dispatch }) => {
          checkInternetConnection().then(isOnline => {
            if (!isOnline) {
              dispatch(actions.additionalInfoAdded(patch.value ?? ''));
            }
          });
        },
      }),

      fetchLdl: builder.query<AnalyticsResponse<BloodSugar>, AnalyticsRequest>({
        query: params => ({
          url: 'user/ldl',
          method: 'GET',
          params,
        }),
        providesTags: ['Ldl-List'],
      }),

      fetchTriglycerides: builder.query<AnalyticsResponse<BloodSugar>, AnalyticsRequest>({
        query: params => ({
          url: 'user/triglyceride',
          method: 'GET',
          params,
        }),
        providesTags: ['Triglycerides-List'],
      }),

      fetchProcedures: builder.query<ProceduresResponse, void>({
        query: () => ({
          url: 'procedures',
          method: 'GET',
        }),
      }),

      fetchProcedurePeriods: builder.query<LabelValue[], void>({
        query: () => ({
          url: 'user/procedures/periods',
          method: 'GET',
        }),
      }),

      fetchProcedureFrequency: builder.query<LabelValue[], void>({
        transformResponse: (response: FrequencyResponse): LabelValue[] =>
          response.map(item => ({ label: String(item.label), value: String(item.value) })),
        query: () => ({
          url: 'user/procedures/interval',
          method: 'GET',
        }),
      }),

      addProcedure: builder.mutation<undefined, AddProcedureRequest>({
        query: body => ({
          url: 'user/procedures',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Events-List', 'Notifications-Count'],
      }),

      updateProcedure: builder.mutation<undefined, UpdateProcedureRequest>({
        query: ({ id, ...body }) => ({
          url: `user/procedures/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Events-List', 'Notifications-Count'],
      }),

      removeProcedure: builder.mutation<undefined, string>({
        query: id => ({
          url: `user/procedures/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Events-List', 'Notifications-Count'],
      }),

      removeAppointment: builder.mutation<undefined, string>({
        query: id => ({
          url: `user/appointments/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Events-List', 'Notifications-Count'],
      }),

      fetchProcedureEntity: builder.query<ProcedureEntity, string>({
        transformResponse: (response: ProcedureResponse): ProcedureEntity => ({
          ...response,
          repeatEnabled: Boolean(response.frequency),
          frequency: response.frequency ? String(response.frequency) : null,
        }),
        query: id => ({
          url: `user/procedures/${id}`,
          method: 'GET',
        }),
      }),

      fetchAppointmentEntity: builder.query<AppointmentEntity, string>({
        query: id => ({
          url: `user/appointments/${id}`,
          method: 'GET',
        }),
      }),

      addAppointment: builder.mutation<undefined, AddAppointmentRequest>({
        query: body => ({
          url: 'user/appointments',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Events-List', 'Notifications-Count'],
      }),

      updateAppointment: builder.mutation<undefined, UpdateAppointmentRequest>({
        query: body => ({
          url: `user/appointments/${body.id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Events-List', 'Notifications-Count'],
      }),
    }),
    overrideExisting: __DEV__,
  });
