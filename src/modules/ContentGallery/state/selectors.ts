import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const selectContentGallery = (state: RootState) => state.contentGallery;
