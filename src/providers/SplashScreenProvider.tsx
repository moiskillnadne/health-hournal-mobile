import { PropsWithChildren, useState, useMemo } from 'react';

import { SplashScreen } from '../components';
import { SplashContext } from '../contexts';

function WithSplashScreen({ children }: PropsWithChildren<unknown>) {
  const [isLoading, setIsLoading] = useState(true);

  const value = useMemo(
    () => ({
      setLoadingState: (value: boolean) => {
        setIsLoading(value);
      },
    }),
    [],
  );

  return (
    <>
      <SplashContext.Provider value={value}>{children}</SplashContext.Provider>

      <SplashScreen isAppReady={!isLoading} />
    </>
  );
}

export default WithSplashScreen;
