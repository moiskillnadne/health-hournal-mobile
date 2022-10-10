import { PropsWithChildren, memo, useContext } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '../state/store';
import { SplashContext } from '../contexts';

type Props = PropsWithChildren<unknown>;

function StateProvider({ children }: Props) {
  const splash = useContext(SplashContext);

  function hideSplashScreen() {
    splash.setLoadingState(false);
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} onBeforeLift={hideSplashScreen} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default memo(StateProvider);
