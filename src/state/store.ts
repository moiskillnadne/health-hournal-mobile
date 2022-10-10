import EncryptedStorage from 'react-native-encrypted-storage';

import { configureStore, ReducersMapObject, Reducer, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import offlineMiddleware from './offlineMiddleware';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import api from './api';
import { reducer as systemReducer } from './system';
import { RootState } from '.';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: EncryptedStorage,
  blacklist: [api.reducerPath, 'auth'],
};

const staticReducers: ReducersMapObject = {
  [api.reducerPath]: api.reducer,
  system: systemReducer,
};

function createReducer(asyncReducers: ReducersMapObject<RootState>) {
  return combineReducers({
    ...asyncReducers,
    ...staticReducers,
  });
}

const combinedReducer = combineReducers(staticReducers);

function createApplicationStore() {
  const store = configureStore({
    reducer: persistReducer(persistConfig, combinedReducer as Reducer<RootState>),
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(api.middleware)
        .concat(offlineMiddleware);
    },
    devTools: __DEV__,
  });

  return {
    ...store,
    asyncReducers: {} as ReducersMapObject,
    injectReducer: function (key: string, asyncReducer: Reducer) {
      this.asyncReducers[key] = asyncReducer;
      this.replaceReducer(
        persistReducer(persistConfig, createReducer(this.asyncReducers) as Reducer<RootState>),
      );
      persistor.persist();
    },
    getStore: () => store,
  };
}

const store = createApplicationStore();

if (__DEV__ && module.hot) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  module.hot.accept(() => store.replaceReducer(createReducer(store.asyncReducers)));
}

export const persistor = persistStore(store);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
setupListeners(store.dispatch);

export default store;
