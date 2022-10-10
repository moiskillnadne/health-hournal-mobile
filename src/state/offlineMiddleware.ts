import { Middleware, Action } from '@reduxjs/toolkit';

import { RootState } from './types';
import { offlineActionCreated } from './system';

interface AnyAction extends Action<string> {
  [extraProps: string]: any;
}

enum API_REQUEST_STATUS {
  PENDING = 'api/executeMutation/pending',
  FULFILLED = 'api/executeMutation/fulfilled',
  REJECTED = 'api/executeMutation/rejected',
}

type RejectedAction = {
  type: API_REQUEST_STATUS.REJECTED;
  payload: {
    error: string;
  };
  meta: {
    arg: {
      endpointName: string;
      originalArgs: any;
    };
    baseQueryMeta: {
      request: {
        headers: {
          map: {
            offline?: string;
          } & Record<string, string>;
        };
      };
    };
  };
};

const offlineMiddleware: Middleware<unknown, RootState> = store => next => (action: AnyAction) => {
  if (action.type === API_REQUEST_STATUS.REJECTED) {
    const rejectedAction = action as RejectedAction;
    const isOfflineAction = 'offline' in rejectedAction.meta.baseQueryMeta.request.headers.map;

    if (isOfflineAction) {
      const { endpointName, originalArgs } = rejectedAction.meta.arg;

      store.dispatch(
        offlineActionCreated({
          endpointName,
          originalArgs,
        }),
      );
    }
  }

  return next(action);
};

export default offlineMiddleware;
