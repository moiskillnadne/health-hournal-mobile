import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usesMetricSystem } from 'react-native-localize';

import { MeasurementUnit, WaterNotification } from '@app/types';

import { logout, tokensReceived } from '../actions';

export type LocalNotification<Notification> = {
  enabled: boolean;
  notification: Notification | null;
};

type OfflineAction = {
  endpointName: string;
  originalArgs: any;
  replace?: boolean;
};

type CurrentUser = {
  id: string;
  token: string;
};

type InitialState = {
  unitType: MeasurementUnit;
  routes: {
    lastVisited: string;
  };
  refreshToken: Maybe<string>;
  notifications: {
    water: LocalNotification<WaterNotification>;
  };
  offlineActionsQuery: OfflineAction[];
  currentUser: Maybe<CurrentUser>;
};

function createInitialState(): InitialState {
  return {
    unitType: usesMetricSystem() ? 'Metric' : 'USA',
    routes: {
      lastVisited: '',
    },
    refreshToken: null,
    notifications: {
      water: {
        enabled: true,
        notification: null,
      },
    },
    offlineActionsQuery: [],
    currentUser: null,
  };
}

const slice = createSlice({
  name: 'system',
  initialState: createInitialState(),
  reducers: {
    changeMeasurementUnit: (state, action: PayloadAction<MeasurementUnit>) => {
      state.unitType = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<CurrentUser & { refreshToken: string }>) => {
      state.refreshToken = action.payload.refreshToken;
      state.currentUser = {
        id: action.payload.id,
        token: action.payload.token,
      };
    },
    waterReminderAdded: (state, action: PayloadAction<WaterNotification>) => {
      state.notifications.water.enabled = true;
      state.notifications.water.notification = action.payload;
    },
    waterReminderEnabled: state => {
      state.notifications.water.enabled = true;
    },
    waterReminderDisabled: state => {
      state.notifications.water.enabled = false;
    },
    waterReminderDisabledToggled: state => {
      state.notifications.water.enabled = !state.notifications.water.enabled;
    },
    offlineActionCreated: (state, action: PayloadAction<OfflineAction>) => {
      state.offlineActionsQuery.push(action.payload);
    },
    offlineActionsCleared: state => {
      state.offlineActionsQuery = [];
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(logout, state => {
        state.refreshToken = null;
      })
      .addCase(tokensReceived, (state, action) => {
        if (state.currentUser) {
          state.currentUser.token = action.payload.idToken;
        }
      });
  },
});

export default slice;
