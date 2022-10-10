import { PropsWithChildren } from 'react';
import { Box, Text, Center, Pressable } from 'native-base';
import { useSearchParams } from 'react-router-native';

type Props = PropsWithChildren<{
  value: string;
  name: string;
}>;

function NavHeader({ name, value, children }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get(name);

  const isActive = currentTab == value;

  const handleChange = (key: string) => {
    searchParams.set(name, key);
    setSearchParams(searchParams);
  };

  return (
    <Pressable onPress={() => handleChange(value)} flex={1} hitSlop={5}>
      <Box py={1.5}>
        <Center>
          <Text color={isActive ? 'primary.500' : 'black'} fontWeight={isActive ? 600 : 400}>
            {children}
          </Text>
        </Center>
      </Box>
    </Pressable>
  );
}

export default NavHeader;
