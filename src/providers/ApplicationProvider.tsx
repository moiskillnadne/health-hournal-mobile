import { PropsWithChildren } from 'react';
import { NetworkProvider } from 'react-native-offline';

import RouteProvider from './RouteProvider';
import StateProvider from './StateProvider';
import ThemeProvider from './ThemeProvider';
import LocalizationProvider from './LocalizationProvider';
import SplashScreenProvider from './SplashScreenProvider';
import DrawerProvider from './DrawerProvider';
import ModalWarningProvider from './ModalWarningProvider';

type Props = PropsWithChildren<unknown>;

function ApplicationProvider({ children }: Props) {
  return (
    <SplashScreenProvider>
      <NetworkProvider pingOnlyIfOffline pingInterval={20000}>
        <LocalizationProvider>
          <ThemeProvider>
            <RouteProvider>
              <StateProvider>
                <DrawerProvider>
                  <ModalWarningProvider>{children}</ModalWarningProvider>
                </DrawerProvider>
              </StateProvider>
            </RouteProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </NetworkProvider>
    </SplashScreenProvider>
  );
}

export default ApplicationProvider;
