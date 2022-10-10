import { useMemo } from 'react';

import UserInactivity, { UserInactivityProps } from 'react-native-user-inactivity';

function Inactivity(props: UserInactivityProps) {
  const timeoutHandler = useMemo(
    () => ({
      setTimeout: (fn: () => void, timeout: number) => {
        return setTimeout(fn, timeout);
      },
      clearTimeout: (timeout: number | unknown) => {
        clearTimeout(timeout as number);
      },
    }),
    [],
  );

  return <UserInactivity {...props} timeoutHandler={timeoutHandler} />;
}

export default Inactivity;
