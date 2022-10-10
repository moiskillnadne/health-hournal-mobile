import { Box, Row, Button, Pressable, Text } from 'native-base';
import { useNavigate } from 'react-router-native';

import { Header, Content, H1, Progress, Logo } from '@app/components';
import { useStepper, useExitAppOnBackButton } from '@app/hooks';

import { useTranslate } from '../../hooks';
import { SettingsIcon, ConfirmedIcon } from '../icons';

function Congratulations() {
  const t = useTranslate();

  const { progress } = useStepper();

  const navigate = useNavigate();

  function navigateUnits() {
    navigate('/private/settings/localization');
  }

  function navigateMyWellnessJourney() {
    navigate('/private/my-wellness-journey');
  }

  useExitAppOnBackButton();

  return (
    <>
      <Header
        title={t('titles.health_assessment')}
        rightElement={
          <Pressable onPress={navigateUnits}>
            <SettingsIcon />
          </Pressable>
        }
      />

      <Progress value={progress} />

      <Content mt={5} flex={1} flexGrow={1} justifyContent={'center'} alignItems={'center'}>
        <Box justifyContent={'center'} alignItems={'center'}>
          <Row justifyContent="center">
            <ConfirmedIcon />
          </Row>

          <H1 mt={7.5} mb={2.5} textAlign="center">
            {t('titles.congratulations')}
          </H1>

          <Text textAlign="center" color="white">
            {t('info.you_completed_your_health_assessment')}
          </Text>
        </Box>
      </Content>
      <Content>
        <Button my={5} onPress={navigateMyWellnessJourney}>
          {t('buttons.my_wellness_journey')}
        </Button>
      </Content>

      <Logo />
    </>
  );
}

export default Congratulations;
