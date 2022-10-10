import { Box, Center, HStack, Text } from 'native-base';
import { useLocation } from 'react-router-native';

import { Content, ErrorAlert } from '@app/components';

import { useTranslate, useResendConfirmationCodeMutation } from '../hooks';
import { InfoBlock, SendAgainButton } from '../components';
import { EmailSentIcon } from '../components/icons';

const ThanksForJoin = () => {
  const { username } = useLocation().state as { username: string };

  const t = useTranslate();

  const [resend, { error }] = useResendConfirmationCodeMutation();

  function submit() {
    if (username) {
      resend({ username });
    }
  }

  return (
    <Content flex={1}>
      <Box flex={1} justifyContent="center" safeAreaTop>
        <InfoBlock
          title={t('titles.welcome')}
          subTitle={
            <>
              <Text>{t('descriptions.to_finish_signing_up')}</Text>
              <Text fontWeight="bold" textDecorationLine="underline">
                {t('descriptions.confirm_e-mail')}
              </Text>
            </>
          }
          icon={<EmailSentIcon />}
        />
      </Box>

      <Box>
        <Center mb="110px">
          <Text color="white">{t('questions.didnt_receive_e-mail')}</Text>
          <Text color="white">{t('questions.check_spam_filter')}</Text>

          <HStack justifyContent="center" mt={2}>
            <SendAgainButton onPress={submit} />
          </HStack>
        </Center>
      </Box>

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </Content>
  );
};

export default ThanksForJoin;
