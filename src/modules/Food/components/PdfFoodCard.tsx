import { useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { Box, Center, Row, Text, Image, Pressable } from 'native-base';

import { Loader } from '@app/components';

import { DownloadIcon } from './icons';
import { CheckFilePermissions, downloadPdf } from '../utils';

type Props = {
  imageSource: string;
  pdfSource: string;
  title: string;
};

function PdfFoodCard({ imageSource, pdfSource, title }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const { height } = useWindowDimensions();

  function finishLoading() {
    setLoaded(true);
  }

  async function download() {
    if (await CheckFilePermissions(Platform.OS)) {
      setLoading(true);

      downloadPdf({ title, pdfSource }).then(() => setLoading(false));
    }
  }

  return (
    <Pressable onPress={download}>
      <Box borderRadius={4}>
        <Box h={height / 3}>
          <Image
            h={height / 3}
            w="full"
            source={{
              uri: imageSource,
            }}
            alt={title}
            rounded={4}
            onLoadEnd={finishLoading}
          />

          {loading ? (
            <Center w="full" h="full" position="absolute">
              <Loader />
            </Center>
          ) : null}

          {!loaded && (
            <Center w="full" h="full" position="absolute">
              <Box w="full" h="full" position="absolute" bgColor="white" />

              <Loader />
            </Center>
          )}
        </Box>

        <Box position="absolute" bottom={0} h="46px" w="full">
          <Row alignItems={'center'} m={3} zIndex={1}>
            <DownloadIcon />

            <Text color="white" ml={2.5} fontWeight={600} numberOfLines={1}>
              {title}
            </Text>
          </Row>
          <Box w="full" h="full" bgColor="black" position="absolute" opacity={0.2} />
        </Box>
      </Box>
    </Pressable>
  );
}

export default PdfFoodCard;
