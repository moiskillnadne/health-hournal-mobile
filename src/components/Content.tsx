import { PropsWithChildren } from 'react';
import { Box, IBoxProps } from 'native-base';

function Content({ children, ...props }: PropsWithChildren<IBoxProps>) {
  return (
    <Box w="full" px={4} {...props}>
      {children}
    </Box>
  );
}

export default Content;
