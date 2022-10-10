import createTriggerNotification, { CreateTriggerNotification } from './createTriggerNotification';

// For some reason Notifee does not trigger notifications when there are more than 29 or 30 scheduled on Android
// That is why we decided to use react-native-push-notification on Android as a temporarily solution.
// When the Notifee's team have worked out a fix then these code should be removed.
export default createTriggerNotification as CreateTriggerNotification;
