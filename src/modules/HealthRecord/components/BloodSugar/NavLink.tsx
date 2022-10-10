import { PropsWithChildren } from 'react';
import { Box, Text, Center } from 'native-base';
import { Link, useResolvedPath, useMatch } from 'react-router-native';

type Props = PropsWithChildren<{
  to: string;
}>;

function NavLink({ to, children }: Props) {
  const path = useResolvedPath(to);

  const isActive = useMatch(path.pathname);

  return (
    <Link
      to={path}
      underlayColor="transparent"
      style={{
        width: '30%',
      }}
    >
      <Box bgColor="white" py={1.5}>
        <Center>
          <Text color={isActive ? 'primary.500' : 'black'} fontWeight={isActive ? 600 : 400}>
            {children}
          </Text>
        </Center>
      </Box>
    </Link>
  );
}

export default NavLink;
