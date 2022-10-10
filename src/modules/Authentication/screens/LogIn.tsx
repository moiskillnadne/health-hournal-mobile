import { useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Box, Heading, VStack, Button, HStack, Text, ScrollView } from 'native-base';
import { useNavigate, useLocation, Location } from 'react-router-native';
import { FormProvider } from 'react-hook-form';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Content, AppLink, ErrorAlert, Recaptcha, Logo } from '@app/components';
import { InputField } from '@app/components/form';
import { LockIcon, ShowPasswordIcon, UserIcon } from '@app/components/icons';
import { useAppForm, useKeyboardBottomInset } from '@app/hooks';
import { SplashContext } from '@app/contexts';

import { useLoginMutation, useTranslate } from '../hooks';
import { LogInSchema } from '../schemas';
import { TLogIn } from '../types';
import { LocalizationBar, Header } from '../components';

const LogIn = () => {
  const form = useAppForm<TLogIn>(
    {
      defaultValues: {
        username: '',
        password: '',
      },
    },
    { schema: LogInSchema },
  );

  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const t = useTranslate();

  const [isPasswordShown, setIsPasswordShow] = useState(false);
  const [isCaptchaShown, setIsCaptchaShown] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);

  const [login, { isSuccess: successfullyLoggedIn, isLoading, error }] = useLoginMutation();

  const onSubmit = (data: TLogIn) => {
    login({
      ...data,
      username: data.username.trim(),
    })
      .unwrap()
      .catch(() => {
        attemptsCount < 2 ? setAttemptsCount(count => ++count) : setIsCaptchaShown(true);
      });
  };

  const navigate = useNavigate();
  const locationState = useLocation().state as Maybe<{ from: Location }>;
  const { setLoadingState } = useContext(SplashContext);

  const togglePassword = () => {
    setIsPasswordShow(isShown => !isShown);
  };

  const closeCaptcha = () => {
    setIsCaptchaShown(false);
  };

  useEffect(() => {
    if (successfullyLoggedIn) {
      const to = locationState?.from?.pathname ?? '/private';
      const state = locationState?.from?.state;

      setLoadingState(true);
      navigate(to, { replace: true, state });
    }
  }, [navigate, setLoadingState, successfullyLoggedIn, locationState]);

  const bottomInset = useKeyboardBottomInset();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraHeight={Platform.OS === 'android' ? -bottomInset : undefined}
      extraScrollHeight={Platform.OS === 'android' ? -bottomInset : undefined}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
    >
      <Content flex={1}>
        <Header>
          <LocalizationBar />
        </Header>

        <Box flex={1} mb={1} justifyContent="center">
          <Box>
            <Heading color="white" mb={5}>
              {t('titles.login')}
            </Heading>

            <FormProvider {...form}>
              <VStack space={2.5} mb={2.5}>
                <InputField label={t('form.username')} name="username" LeftElement={<UserIcon />} />

                <InputField
                  label={t('form.password')}
                  type={isPasswordShown ? 'text' : 'password'}
                  name="password"
                  LeftElement={<LockIcon />}
                  RightElement={<ShowPasswordIcon onPress={togglePassword} />}
                />
              </VStack>
            </FormProvider>

            <Text my={2}>
              <AppLink to="/public/restore-password">{t('questions.forgot_password')}</AppLink>
            </Text>
            <Text>
              <AppLink to="/public/restore-username">{t('questions.forgot_username')}</AppLink>
            </Text>
          </Box>
        </Box>

        <Button
          isDisabled={!isDirty}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          mb="30px"
        >
          {t('login')}
        </Button>

        <HStack>
          <Text mr={1} color="white">
            {t('questions.dont_have_account')}
          </Text>
          <AppLink to="/public/sign-up">{t('signup')}</AppLink>
        </HStack>

        <Recaptcha isOpen={isCaptchaShown} onVerify={closeCaptcha} />

        {error && <ErrorAlert error={error}></ErrorAlert>}
      </Content>

      <Logo />
    </KeyboardAwareScrollView>
  );
};
export default LogIn;
