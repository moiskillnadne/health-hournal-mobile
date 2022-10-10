import { Pressable, StyledProps } from 'native-base';

import { AddIcon } from './icons';

type Props = {
  onPress: () => void;
} & StyledProps;

function AddButton({ onPress }: Props) {
  return (
    <Pressable
      w={8}
      h={8}
      bgColor="white"
      borderRadius={4}
      justifyContent="center"
      alignItems="center"
    >
      <AddIcon onPress={onPress} />
    </Pressable>
  );
}

export default AddButton;
