import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/state';

const selectSystem = (state: RootState) => state.system;

export const selectLastVisitedRoute = createSelector(
  selectSystem,
  system => system.routes.lastVisited,
);
export const selectMeasurementUnit = createSelector(selectSystem, system => system.unitType);
export const selectRefreshToken = createSelector(selectSystem, system => system.refreshToken);
export const selectWaterNotification = createSelector(
  selectSystem,
  system => system.notifications.water,
);
export const selectOfflineActionsQuery = createSelector(
  selectSystem,
  system => system.offlineActionsQuery,
);
export const selectCurrentUser = createSelector(selectSystem, system => system.currentUser);
