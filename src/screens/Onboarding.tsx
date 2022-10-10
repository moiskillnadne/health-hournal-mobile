import { useEffect } from 'react';
import { Column, Button, Text, Box, ScrollView } from 'native-base';
import { useNavigate } from 'react-router-native';

import { H1, VideoPlayer, Logo, Content, Header } from '@app/components';
import { WelcomeVideo } from '@assets/videos';

import { useCheckFirstLaunch, useCommonTranslate } from '../hooks';

function Onboarding() {
  const t = useCommonTranslate();

  const navigate = useNavigate();

  const { setAppLaunched } = useCheckFirstLaunch();

  function navigateSignUp() {
    navigate('/public/sign-up');
  }

  useEffect(() => {
    setAppLaunched();
  }, [setAppLaunched]);

  return (
    <Box flex={1}>
      <Header title={t('titles.vitalop_wellness')} />

      <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
        <Column flex={1} justifyContent="space-between">
          <Content px={5}>
            <H1 mt={9} textAlign="center">
              {t('titles.lets_get_started')}
            </H1>

            <Text mt="30px" mb={3} color="white" textAlign="center">
              {t('descriptions.you_do_not_miss_out_opportunity')}
            </Text>
          </Content>

          <VideoPlayer h="219px" source={WelcomeVideo} />

          <Box>
            <Button mx={4} mt={4} onPress={navigateSignUp}>
              {t('actions.join_the_vitalop_journey')}
            </Button>

            <Logo />
          </Box>
        </Column>
      </ScrollView>
    </Box>
  );
}

export default Onboarding;
