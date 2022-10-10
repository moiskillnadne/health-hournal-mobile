import { Box, HStack, Text } from 'native-base';

import { Content, AppLink } from '@app/components';

import { useTranslate } from '../hooks';
import { InfoBlock } from '../components';
import { LockIcon } from '../components/icons';

const CheckEmail = () => {
  const t = useTranslate();

  return (
    <Content flex={1}>
      <Box flex={1} justifyContent="center" mt={18} safeAreaTop>
        <InfoBlock
          title={t('titles.check_email')}
          subTitle={t('descriptions.instructions_sent')}
          icon={<LockIcon />}
        />
      </Box>

      <HStack justifyContent="center" mt="100px" mb="56px">
        <Text textAlign="center">
          <Text color="white">
            {t('questions.didnt_receive_e-mail')} {t('questions.check_spam_filter_or')}{' '}
          </Text>
          <AppLink ml={1} to="/public/restore-password">
            {t('questions.try_another_e-mail')}
          </AppLink>
        </Text>
      </HStack>
    </Content>
  );
};
export default CheckEmail;
