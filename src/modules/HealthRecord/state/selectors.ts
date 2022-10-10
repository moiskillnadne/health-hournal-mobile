import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const getHealthRecord = (state: RootState) => state.healthRecord;

export const selectHealthRecord = createSelector(getHealthRecord, state => state);

export const selectMedication = createSelector(getHealthRecord, state => state.medication);

export const selectWeight = createSelector(getHealthRecord, state => state.weight);

export const selectBloodPressure = createSelector(getHealthRecord, state => state.bloodPressure);

export const selectHba1c = createSelector(getHealthRecord, state => state.hba1c);

export const selectBloodSugar = createSelector(getHealthRecord, state => state.bloodSugar);

export const selectRandomBloodSugar = createSelector(selectBloodSugar, state => state.random);

export const selectFastingBloodSugar = createSelector(selectBloodSugar, state => state.fasting);

export const selectAfterMealBloodSugar = createSelector(selectBloodSugar, state => state.afterMeal);

export const selectCholesterol = createSelector(getHealthRecord, state => state.cholesterol);

export const selectLDL = createSelector(selectCholesterol, state => state.ldl);

export const selectTriglycerides = createSelector(selectCholesterol, state => state.triglycerides);

export const selectAdditionalInfo = createSelector(getHealthRecord, state => state.additionalInfo);

export const selectProcedure = createSelector(getHealthRecord, state => state.procedure);

export const selectAppointment = createSelector(getHealthRecord, state => state.appointment);
