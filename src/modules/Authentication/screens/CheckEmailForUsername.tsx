import { Box, Row, Text } from 'native-base';

import { Content, AppLink, Logo } from '@app/components';

import { useTranslate } from '../hooks';
import { InfoBlock } from '../components';
import { LockIcon } from '../components/icons';

function CheckEmailForUsername() {
  const t = useTranslate();

  return (
    <Content flex={1} safeAreaTop>
      <Box flex={1} justifyContent="center">
        <InfoBlock
          title={t('titles.check_email')}
          subTitle={t('descriptions.instructions_username_sent')}
          icon={<LockIcon />}
        />
      </Box>

      <Row mb={4} flexWrap="wrap">
        <Text>
          <Text color="white">
            {t('questions.didnt_receive_e-mail')} {t('questions.check_spam_filter_or')}{' '}
          </Text>

          <AppLink to="/public/restore-username">{t('questions.try_another_e-mail')}</AppLink>
        </Text>
      </Row>

      <Logo />
    </Content>
  );
}
export default CheckEmailForUsername;
