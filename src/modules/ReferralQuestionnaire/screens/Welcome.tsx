import { useState } from 'react';
import { Platform } from 'react-native';
import { Center, Column, Button, Text, Box } from 'native-base';
import { useNavigate } from 'react-router-native';

import { H1, VideoPlayer, Logo } from '@app/components';
import { WelcomeVideo } from '@assets/videos';

import { useTranslate } from '../hooks';

function Welcome() {
  const t = useTranslate();

  const navigate = useNavigate();
  const [finishedWatchingVideo, setFinishedWatchingVideo] = useState(false);

  function complete() {
    setFinishedWatchingVideo(true);
  }

  function navigatePrivate() {
    navigate('/private');
  }

  return (
    <Column safeAreaTop flex={1} justifyContent="space-between">
      <Center>
        <H1 textAlign="center" maxW="200px" mt={Platform.select({ ios: 5, android: 9 })}>
          {t('titles.welcome')}
        </H1>

        <Text mt="30px" color="white">
          {t('descriptions.watch_video')}
        </Text>
      </Center>

      <VideoPlayer h="219px" source={WelcomeVideo} onEnd={complete} />

      <Box>
        <Button isDisabled={!finishedWatchingVideo} mx={4} onPress={navigatePrivate}>
          {t('buttons.go_to_health_assessment')}
        </Button>

        <Logo />
      </Box>
    </Column>
  );
}

export default Welcome;
