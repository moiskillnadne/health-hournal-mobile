import { PropsWithChildren } from 'react';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-native';
import { Pressable, Center, Text, Circle } from 'native-base';

type Props = PropsWithChildren<{ id: string; hasIndicator: boolean }>;

function NavigationItem({ children, id, hasIndicator }: Props) {
  const { pathname } = useResolvedPath(id);
  const navigate = useNavigate();

  const isActive = useMatch(pathname);

  function navigateItem() {
    navigate(pathname);
  }

  return (
    <Pressable onPress={navigateItem} flex={1}>
      <Center borderRadius={4} padding={2} bgColor={isActive ? 'secondary.500' : 'white'}>
        {hasIndicator && (
          <Circle size={2} bg="#f23836" position="absolute" right="1.5px" top="1.5px" />
        )}

        <Text color={isActive ? 'white' : 'black'} fontWeight={isActive ? 'medium' : 'normal'}>
          {children}
        </Text>
      </Center>
    </Pressable>
  );
}

export default NavigationItem;
