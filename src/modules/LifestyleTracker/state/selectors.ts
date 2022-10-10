import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const getLifestyleTracker = (state: RootState) => state.lifestyleTracker;

export const selectWater = createSelector(getLifestyleTracker, state => state.water);

export const selectSteps = createSelector(getLifestyleTracker, state => state.steps);

export const selectSleep = createSelector(getLifestyleTracker, state => state.sleep);
