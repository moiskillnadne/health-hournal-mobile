import { PropsWithChildren } from 'react';
import { Text, StyledProps } from 'native-base';

function H1({ children, ...props }: PropsWithChildren<StyledProps>) {
  return (
    <Text fontSize="22px" color="white" fontWeight="bold" {...props}>
      {children}
    </Text>
  );
}

export default H1;
