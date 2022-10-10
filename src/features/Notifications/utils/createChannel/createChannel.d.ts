import { AndroidChannel } from '@notifee/react-native';

export * from './createChannel.android';
export * from './createChannel.ios';

export type CreateChannel = (options: AndroidChannel) => Promise<string>;
