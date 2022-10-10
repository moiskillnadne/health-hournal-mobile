import { InitialNotification } from '@notifee/react-native';

export * from './useInitialNotification.android';
export * from './useInitialNotification.ios';

type clear = () => unknown;
export type UseInitialNotification = () => [InitialNotification, clear];
