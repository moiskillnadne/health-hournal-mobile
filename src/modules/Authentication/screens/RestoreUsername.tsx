import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import { Box, Button, Row, Text, ScrollView } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { Content, AppLink, ErrorAlert, Logo, KeyboardAvoidingBox } from '@app/components';
import { InputField } from '@app/components/form';
import { MailIcon } from '@app/components/icons';

import { useAppForm } from '@app/hooks';

import { useTranslate, useRestoreUsernameMutation } from '../hooks';
import { RestoreUsernameSchema } from '../schemas';
import { RestoreUsernameForm } from '../types';
import { InfoBlock } from '../components';
import { LockIcon } from '../components/icons';

function RestoreUsername() {
  const form = useAppForm<RestoreUsernameForm>(
    {
      defaultValues: {
        email: '',
      },
    },
    { schema: RestoreUsernameSchema },
  );

  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const t = useTranslate();

  const [
    sentRestorationRequest,
    { isLoading: isSendingRestorationRequest, isSuccess: successfullySentRequest, error },
  ] = useRestoreUsernameMutation();

  const onSubmit = ({ email }: RestoreUsernameForm) => {
    sentRestorationRequest({ email });
  };

  const navigation = useNavigate();

  useEffect(() => {
    if (successfullySentRequest) {
      navigation('/public/check-email-for-username');
    }
  }, [navigation, successfullySentRequest]);

  return (
    <Box flex={1}>
      <KeyboardAvoidingBox>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Content flex={1} position="relative" safeAreaTop>
            <Box flex={1} justifyContent="center" mb={2}>
              <FormProvider {...form}>
                <InfoBlock
                  title={t('titles.restore_username')}
                  subTitle={t('descriptions.e-mail_for_restoring_username')}
                  icon={<LockIcon />}
                />

                <InputField
                  mt="30px"
                  label={t('form.email')}
                  name="email"
                  LeftElement={<MailIcon />}
                />

                <Button
                  isDisabled={!isDirty}
                  isLoading={isSendingRestorationRequest}
                  onPress={handleSubmit(onSubmit)}
                  mt={5}
                >
                  {t('buttons.send')}
                </Button>
              </FormProvider>
            </Box>

            <Row justifyContent="center" mb={4}>
              <Text fontSize="md" color="white">
                {t('back_to')}
              </Text>

              <AppLink to="/public/login" ml={1}>
                {t('login')}
              </AppLink>
            </Row>
          </Content>
        </ScrollView>
      </KeyboardAvoidingBox>

      <Logo />

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </Box>
  );
}

export default RestoreUsername;
