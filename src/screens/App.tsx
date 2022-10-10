import { FC, Suspense, useLayoutEffect } from 'react';
import { Text, StatusBar } from 'react-native';
import Orientation from 'react-native-orientation-locker';

import { useDisabledFontScaling } from '../hooks';
import { ApplicationProvider } from '../providers';
import { disableLogs } from '../utils';
import { usePurchasesSetup } from '../features/Purchases';

import Routes from '../Routes';

disableLogs();

const App: FC = () => {
  useLayoutEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  useLayoutEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useDisabledFontScaling();
  usePurchasesSetup();

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ApplicationProvider>
        <Routes />
      </ApplicationProvider>
    </Suspense>
  );
};

export default App;
