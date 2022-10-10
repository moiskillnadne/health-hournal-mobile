import api from './api';
import { reducer as systemReducer } from './system';
import store from './store';

import { ModuleState as AuthenticationState } from '../modules/Authentication';
import { ModuleState as SettingsState } from '../modules/Settings';
import { ModuleState as HealthAssessment } from '../modules/HealthAssessment';
import { ModuleState as ContentGallery } from '../modules/ContentGallery';
import { ModuleState as MyWellnessJourney } from '../modules/MyWellnessJourney';
import { ModuleState as HealthRecord } from '../modules/HealthRecord';
import { ModuleState as LifestyleTracker } from '../modules/LifestyleTracker';
import { ModuleState as Food } from '../modules/Food';
import { ModuleState as Home } from '../modules/Home';
import { ModuleState as Notifications } from '../modules/Notifications';

export type RootState = {
  [api.reducerPath]: ReturnType<typeof api.reducer>;
  system: ReturnType<typeof systemReducer>;
} & AuthenticationState &
  SettingsState &
  HealthAssessment &
  ContentGallery &
  HealthRecord &
  MyWellnessJourney &
  LifestyleTracker &
  Food &
  Home &
  Notifications;

export type AppDispatch = typeof store.dispatch;

export type RefreshResponse = {
  accessToken: string;
  idToken: string;
};
