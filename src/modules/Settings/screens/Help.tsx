import { useState, useEffect } from 'react';
import { Box, Button, TextArea, ScrollView } from 'native-base';

import {
  Header,
  Content,
  BackArrow,
  H1,
  ErrorAlert,
  KeyboardAvoidingBox,
  Logo,
} from '@app/components';
import { showConfirmCancellationWarning } from '@app/utils';

import { useTranslate, useContactSupportMutation } from '../hooks';

function Notifications() {
  const t = useTranslate();

  const [message, setMessage] = useState('');

  const isDirty = !!message.trim();

  const [sendMessage, { isLoading: isSendingMessage, isSuccess: successfullySent, error }] =
    useContactSupportMutation();

  function submit() {
    sendMessage(message);
  }

  function showWarning() {
    return new Promise(resolve => {
      showConfirmCancellationWarning({
        onConfirm: () => resolve(true),
        onDecline: () => resolve(false),
      });
    });
  }

  useEffect(() => {
    if (successfullySent) {
      setMessage('');
    }
  }, [successfullySent]);

  return (
    <>
      <Box flex={1}>
        <Header
          title={t('titles.help')}
          leftElement={<BackArrow onBeforeNavigation={isDirty ? showWarning : undefined} />}
        />

        <KeyboardAvoidingBox>
          <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
            <Content mt="30px" flex={1}>
              <H1>{t('descriptions.we_appreciate')}</H1>
              <H1 mb={5}>{t('descriptions.contact_us')}</H1>

              <TextArea
                mb={5}
                h="200px"
                value={message}
                onChangeText={setMessage}
                placeholder={t('placeholders.help')}
                autoCompleteType="off"
                maxLength={1000}
              />

              <Button isDisabled={!isDirty} isLoading={isSendingMessage} onPress={submit}>
                {t('buttons.send')}
              </Button>
            </Content>

            <Logo />
          </ScrollView>
        </KeyboardAvoidingBox>
      </Box>

      {error && <ErrorAlert error={error} />}
    </>
  );
}

export default Notifications;
