import { PropsWithChildren } from 'react';
import { Text, Box, StyledProps, Link as NBLi } from 'native-base';
import { Link } from 'react-router-native';

type Props = {
  to: string;
} & StyledProps;

function AppLink({ to, children, ...props }: PropsWithChildren<Props>) {
  return (
    <Box {...props}>
      <Link to={to} underlayColor="transparent">
        <Text color="white" fontWeight="medium" underline fontSize="md">
          {children}
        </Text>
      </Link>
    </Box>
  );
}

export default AppLink;
