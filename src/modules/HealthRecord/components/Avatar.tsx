import { Avatar as NativeAvatar, Text } from 'native-base';

import { useFetchAvatarQuery } from '../../Settings/hooks';
import { getFirstLetter, createBase64Uri } from '../../Settings/utils';

type Props = {
  firstName?: string;
};

function Avatar({ firstName }: Props) {
  const { data: source } = useFetchAvatarQuery();

  return (
    <NativeAvatar
      source={{
        uri: source ? createBase64Uri(source?.base64, source?.mimeType) : undefined,
      }}
      size={20}
      borderWidth={2}
      borderColor="white"
      bgColor="primary.400"
      mr={2.5}
    >
      <Text fontSize={22} fontWeight="bold" color="white" mb={2}>
        {getFirstLetter(firstName)}
      </Text>
    </NativeAvatar>
  );
}

export default Avatar;
