import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import { Box, Button, HStack, Text } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { Content, AppLink, ErrorAlert } from '@app/components';
import { InputField } from '@app/components/form';
import { MailIcon } from '@app/components/icons';

import { useAppForm } from '@app/hooks';

import { useTranslate, useRestorePasswordMutation } from '../hooks';
import { RestorePasswordSchema } from '../schemas';
import { RestorePasswordForm } from '../types';
import { InfoBlock } from '../components';
import { LockIcon } from '../components/icons';

const RestorePassword = () => {
  const form = useAppForm<RestorePasswordForm>(
    {
      defaultValues: {
        email: '',
      },
    },
    { schema: RestorePasswordSchema },
  );

  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const t = useTranslate();

  const [
    sentRestorationRequest,
    { isLoading: isSendingRestorationRequest, isSuccess: successfullySentRequest, error },
  ] = useRestorePasswordMutation();

  const onSubmit = ({ email }: RestorePasswordForm) => {
    sentRestorationRequest({ email });
  };

  const navigation = useNavigate();

  useEffect(() => {
    if (successfullySentRequest) {
      navigation('/public/check-email');
    }
  }, [navigation, successfullySentRequest]);

  return (
    <>
      <Content flex={1} justifyContent="flex-end" position="relative">
        <FormProvider {...form}>
          <Box safeAreaTop>
            <InfoBlock
              title={t('titles.restore_password')}
              subTitle={t('descriptions.e-mail_for_restoring')}
              icon={<LockIcon />}
            />

            <InputField mt="30px" label={t('form.email')} name="email" LeftElement={<MailIcon />} />

            <Button
              isDisabled={!isDirty}
              isLoading={isSendingRestorationRequest}
              onPress={handleSubmit(onSubmit)}
              mt={5}
            >
              {t('buttons.send')}
            </Button>
          </Box>
        </FormProvider>

        <HStack justifyContent="center" mt="100px" mb="56px">
          <Text fontSize="md" color="white">
            {t('back_to')}
          </Text>
          <AppLink to="/public/login" ml={1}>
            {t('login')}
          </AppLink>
        </HStack>
      </Content>

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </>
  );
};
export default RestorePassword;
