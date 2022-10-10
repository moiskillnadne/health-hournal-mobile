/**
 * @format
 */

import { AppRegistry } from 'react-native';

import App from './src/screens/App';
import { watchBackgroundMessages, watchBackgroundEvent } from './src/features/Notifications';
import { name as appName } from './app.json';

watchBackgroundEvent();
watchBackgroundMessages();

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
