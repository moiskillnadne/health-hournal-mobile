import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const selectFood = (state: RootState) => state.food;
