import { useState, useEffect } from 'react';
import { Box, Heading, VStack, HStack, Button, Text } from 'native-base';
import { useSearchParams, useNavigate } from 'react-router-native';
import { FormProvider } from 'react-hook-form';

import { Content, ErrorAlert } from '@app/components';
import { InputField } from '@app/components/form';
import { LockIcon, ShowPasswordIcon, PasswordHintIcon } from '@app/components/icons';

import { useAppForm } from '@app/hooks';

import { useTranslate, useConfirmNewPasswordMutation } from '../hooks';
import { NewPasswordSchema } from '../schemas';
import { NewPasswordForm } from '../types';

const CreateNewPassword = () => {
  const [isPasswordShown, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShow] = useState(false);

  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const email = searchParams.get('email')?.replace(' ', '+');

  const form = useAppForm<NewPasswordForm>(
    {
      defaultValues: {
        password: '',
        confirmPassword: '',
      },
    },
    { schema: NewPasswordSchema },
  );

  const {
    watch,
    trigger,
    handleSubmit,
    formState: { isDirty, errors },
  } = form;

  const [passwordField] = watch(['password']);

  const navigate = useNavigate();
  const t = useTranslate();

  const [
    confirmPassword,
    { isLoading: isConfirmingPassword, isSuccess: successfullyConfirmed, error },
  ] = useConfirmNewPasswordMutation();

  const onSubmit = ({ password }: NewPasswordForm) => {
    if (code && email) {
      confirmPassword({
        code,
        email,
        newPassword: password,
      });
    }
  };

  const togglePassword = () => {
    setIsPasswordShow(isShown => !isShown);
  };

  const toggleConfirmPassword = () => {
    setIsConfirmPasswordShow(isShown => !isShown);
  };

  useEffect(() => {
    if (passwordField && errors?.password) {
      trigger();
    }
  }, [passwordField, errors, trigger]);

  useEffect(() => {
    if (successfullyConfirmed) {
      navigate('/public/password-recovered');
    }
  }, [navigate, successfullyConfirmed]);

  return (
    <Content flex={1}>
      <Box flex={1} justifyContent="center" safeAreaTop>
        <Box>
          <Heading color="white">{t('titles.create_password')}</Heading>

          <Text mb={4} mt={5} color="white" fontSize="md">
            {t('descriptions.password_instructions')}
          </Text>

          <FormProvider {...form}>
            <VStack space={2.5}>
              <InputField
                label={t('form.new_password')}
                type={isPasswordShown ? 'text' : 'password'}
                name="password"
                LeftElement={<LockIcon />}
                RightElement={
                  <HStack alignItems="center">
                    <Box mr={3}>
                      <PasswordHintIcon />
                    </Box>
                    <ShowPasswordIcon onPress={togglePassword} />
                  </HStack>
                }
              />
              <InputField
                label={t('form.repeat_password')}
                type={isConfirmPasswordShown ? 'text' : 'password'}
                name="confirmPassword"
                LeftElement={<LockIcon />}
                RightElement={<ShowPasswordIcon onPress={toggleConfirmPassword} />}
              />
            </VStack>
          </FormProvider>

          <Button
            isDisabled={!isDirty}
            onPress={handleSubmit(onSubmit)}
            isLoading={isConfirmingPassword}
            mt={5}
          >
            {t('buttons.reset_password')}
          </Button>
        </Box>
      </Box>

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </Content>
  );
};
export default CreateNewPassword;
