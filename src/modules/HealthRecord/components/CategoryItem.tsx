import { ElementType } from 'react';
import { Box, Text, Pressable } from 'native-base';
import { useResolvedPath, useNavigate, useLocation } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { noop } from '@app/utils';

type Item = {
  key: string;
  title: string;
  Icon: ElementType;
};

type Props = {
  item: Item;
};

function CategoryItem({ item }: Props) {
  const isConnected = useIsConnected();

  const { pathname } = useResolvedPath(item.key);

  const { pathname: locationPathname, search: locationSearch } = useLocation();

  const isActive = locationPathname?.includes(pathname);
  const isDisabled = isConnected || item.key === 'vitals' || item.key === 'additional_information';

  const navigate = useNavigate();

  function onPress() {
    navigate({ pathname, search: locationSearch });
  }

  return (
    <Pressable onPress={isDisabled ? onPress : noop}>
      <Box
        key={item.title}
        borderColor={'#e9e9e9'}
        borderWidth={1}
        borderRadius={4}
        py={2.5}
        px={1}
        width={100}
        height={100}
        alignItems="center"
        bgColor={isActive ? 'primary.500' : 'white'}
        opacity={isDisabled ? 1 : 0.5}
      >
        <Box>
          <item.Icon fill={isActive ? 'white' : undefined} />
        </Box>
        <Text
          fontSize={14}
          fontWeight={600}
          textAlign="center"
          letterSpacing={-0.28}
          mt={1}
          flexWrap="wrap"
          color={isActive ? 'white' : 'black'}
        >
          {item.title}
        </Text>
      </Box>
    </Pressable>
  );
}

export default CategoryItem;
