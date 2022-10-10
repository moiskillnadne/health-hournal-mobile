import { PropsWithChildren } from 'react';
import { HStack, Box, StyledProps } from 'native-base';

function Header({ children, ...props }: PropsWithChildren<StyledProps>) {
  return (
    <HStack w="100%" {...props} safeAreaTop>
      <Box flex={1} py={2.5}>
        {children}
      </Box>
    </HStack>
  );
}

export default Header;
