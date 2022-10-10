import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const selectHome = (state: RootState) => state.home;
