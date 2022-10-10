import notifee, { AndroidChannel } from '@notifee/react-native';

export default function createChannel(options: AndroidChannel) {
  return notifee.createChannel(options);
}
