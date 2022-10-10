import React, { PropsWithChildren } from 'react';
import { Pressable, Center } from 'native-base';

type Props = PropsWithChildren<{
  onPress: () => unknown;
}>;

function Backdrop({ children, onPress }: Props) {
  return (
    <Pressable position="absolute" w="full" h="full" onPress={onPress}>
      <Center w="full" h="full" bgColor={'rgba(0, 0, 0, 0.5)'}>
        {children}
      </Center>
    </Pressable>
  );
}

export default Backdrop;
