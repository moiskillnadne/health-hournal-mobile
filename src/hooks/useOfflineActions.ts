import { useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';
import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { MutationActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  offlineActionsCleared,
  selectOfflineActionsQuery,
  selectIsAuthenticated,
  baseApi,
} from '@app/state';

type Endpoints = Record<
  string,
  {
    initiate: (
      ...args: any[]
    ) => ThunkAction<MutationActionCreatorResult<any>, any, any, AnyAction>;
  }
>;

function useOfflineActions() {
  const dispatch = useAppDispatch();
  const offlineActionsQuery = useAppSelector(selectOfflineActionsQuery);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const isConnected = useIsConnected();

  useEffect(() => {
    async function callActions() {
      for (const action of offlineActionsQuery) {
        const { originalArgs, endpointName } = action;

        await dispatch(
          (baseApi.endpoints as Endpoints)[endpointName].initiate(
            originalArgs ? originalArgs : undefined,
          ),
        );
      }
    }

    if (isConnected && isAuthenticated && offlineActionsQuery.length) {
      dispatch(offlineActionsCleared());
      callActions();
    }
  }, [dispatch, isAuthenticated, isConnected, offlineActionsQuery]);
}

export default useOfflineActions;
