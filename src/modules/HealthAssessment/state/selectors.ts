import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const getHealthAssessment = (state: RootState) => state.healthAssessment;

export const selectHealthAssessment = createSelector(getHealthAssessment, state => state);

export const selectPersonalInformation = createSelector(
  getHealthAssessment,
  state => state.personalInformation,
);

export const selectDateOfBirth = createSelector(
  getHealthAssessment,
  state => state.personalInformation.dateOfBirth,
);

export const selectGender = createSelector(
  getHealthAssessment,
  state => state.personalInformation.gender,
);

export const selectConditions = createSelector(getHealthAssessment, state => state.conditions);

export const selectTellAboutHealth = createSelector(getHealthAssessment, state => state.info);

export const selectAnswerMoreQuestions = createSelector(
  getHealthAssessment,
  state => state.questions,
);

export const selectNextDoctorsAppointment = createSelector(
  getHealthAssessment,
  state => state.appointments,
);

export const selectAppointment = createSelector(getHealthAssessment, state => state.appointment);

export const selectTellAboutLifestyle = createSelector(
  getHealthAssessment,
  state => state.lifestyle,
);

export const selectScreeningTest = createSelector(getHealthAssessment, state => state.colon);

export const selectPapSmear = createSelector(getHealthAssessment, state => state.papSmear);

export const selectMammogram = createSelector(getHealthAssessment, state => state.mammogram);
