import { PropsWithChildren } from 'react';
import { Text } from 'native-base';

function HeaderTitle({ children }: PropsWithChildren<unknown>) {
  return (
    <Text fontWeight="medium" color="white" textAlign="center" width={'100%'} position="absolute">
      {children}
    </Text>
  );
}

export default HeaderTitle;
