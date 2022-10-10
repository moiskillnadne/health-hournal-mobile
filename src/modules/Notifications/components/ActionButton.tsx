import { Box, Text } from 'native-base';

import { Pressable } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
};

function ActionButton({ text, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Box rounded={4} borderColor="#9b57d3" borderWidth={1} px={2.5} py={1} mt={2.5}>
        <Text color={'#9b57d3'} fontSize={14} fontWeight={600}>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
}

export default ActionButton;
