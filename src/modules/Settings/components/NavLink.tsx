import { PropsWithChildren } from 'react';
import { HStack, Text, Center } from 'native-base';
import { Link, useResolvedPath } from 'react-router-native';

import { ArrowIcon } from './icons';

type Props = PropsWithChildren<{
  to: string;
  isDisabled?: boolean;
}>;

function NavLink({ to, children, isDisabled }: Props) {
  const path = useResolvedPath(to);

  return (
    <Link to={path} disabled={isDisabled}>
      <HStack
        borderRadius={4}
        bg="white"
        justifyContent="space-between"
        py="14px"
        pl="16px"
        pr="10px"
      >
        <Center>
          <Text fontWeight="medium">{children}</Text>
        </Center>

        <ArrowIcon />
      </HStack>
    </Link>
  );
}

export default NavLink;
