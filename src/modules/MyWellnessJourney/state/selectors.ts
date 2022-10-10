import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const selectSettings = (state: RootState) => state.myWellnessJourney;
