import { useEffect, useState } from 'react';
import { Box, Circle, Text, Pressable, Avatar, Spinner } from 'native-base';
import ImagePicker, { Image } from 'react-native-image-crop-picker';

import { ErrorAlert } from '@app/components';
import { PencilIcon } from '@app/components/icons';

import { useUploadAvatarMutation, useFetchAvatarQuery } from '../hooks';
import { getFirstLetter, createBase64Uri } from '../utils';

type Props = {
  name: Maybe<string>;
};

function SmartAvatar({ name }: Props) {
  const [uri, setUri] = useState<string>();

  const [upload, { isLoading: isUploading, error }] = useUploadAvatarMutation();

  const { data: source } = useFetchAvatarQuery();

  function pickPicture() {
    ImagePicker.openPicker({
      width: 64,
      height: 64,
      cropping: true,
      multiple: false,
      includeBase64: true,
    }).then(({ data, mime }: Image) => {
      if (!data) throw Error('[SmartAvatar]: failed to get base64 image');

      upload({
        data,
        mime,
      });

      setUri(createBase64Uri(data, mime));
    });
  }

  useEffect(() => {
    if (source) {
      setUri(createBase64Uri(source.base64, source.mimeType));
    }
  }, [source]);

  return (
    <>
      <Box position="relative">
        <Pressable onPress={pickPicture}>
          <Avatar
            source={{ uri }}
            size={16}
            borderWidth={2}
            borderColor="white"
            bgColor="primary.400"
            zIndex={12}
          >
            <Text fontSize={22} fontWeight="bold" color="white" mb={2}>
              {getFirstLetter(name)}
            </Text>
          </Avatar>
        </Pressable>

        <Circle bg="white" size={8} position="absolute" right={-16} bottom={0}>
          <PencilIcon />
        </Circle>

        {isUploading && (
          <Spinner size="lg" color="white" position="absolute" zIndex={1} top={4} left={4} />
        )}
      </Box>

      {error && <ErrorAlert error={error} />}
    </>
  );
}

export default SmartAvatar;
