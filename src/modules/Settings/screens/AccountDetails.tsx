import { useEffect } from 'react';
import { Box, VStack, Center, Button } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Header, Content, BackArrow, ErrorAlert, Logo } from '@app/components';
import { HintIcon } from '@app/components/icons';
import { InputField } from '@app/components/form';
import { useAppForm, useAppSelector, useAppDispatch, useCommonTranslate } from '@app/hooks';
import { selectUser, selectAccessToken, userChanged, logoff } from '@app/state';
import { showConfirmCancellationWarning, showEmailChangedWarning } from '@app/utils';
import { User } from '@app/types';

import { useTranslate, useSaveUserMutation } from '../hooks';
import { UserForm } from '../types';
import { UserSchema } from '../schemas';
import { SmartAvatar } from '../components';

function AccountDetails() {
  const t = useTranslate();
  const globalT = useCommonTranslate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);

  const [
    save,
    { isLoading: isSavingUser, isSuccess: successfullySaved, error, reset: resetSaveMutation },
  ] = useSaveUserMutation();

  const form = useAppForm<UserForm>(
    {
      defaultValues: getDefaultValues(user),
    },
    {
      schema: UserSchema,
      context: {
        userEmail: user?.email,
      },
    },
  );

  const {
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { isDirty },
  } = form;

  const [firstName, email] = watch(['firstName', 'email']);

  const emailChanged = user?.email !== email;

  function getDefaultValues(user: Maybe<User>) {
    return {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      companyCode: user?.companyCode ?? '',
      email: user?.email ?? '',
      repeatEmail: '',
      country: user?.country ?? '',
      state: user?.state ?? '',
      city: user?.city ?? '',
    };
  }

  async function onSubmit(data: UserForm) {
    const shouldContinue = await processEmailChange();

    if (!shouldContinue) return;

    if (accessToken) {
      save({
        data,
        accessToken,
      });
    } else {
      throw Error('No access token provided');
    }
  }

  function showCancelWarning() {
    return new Promise(resolve => {
      showConfirmCancellationWarning({
        onConfirm: () => resolve(true),
        onDecline: () => resolve(false),
      });
    });
  }

  function processEmailChange() {
    return new Promise<boolean>(resolve => {
      if (emailChanged) {
        showEmailChangedWarning({
          onConfirm: () => resolve(true),
          onDecline: () => resolve(false),
        });
      } else {
        resolve(true);
      }
    });
  }

  useEffect(() => {
    if (user) reset(getDefaultValues(user));
  }, [reset, user]);

  useEffect(() => {
    if (successfullySaved) {
      dispatch(userChanged(getValues()));

      emailChanged && dispatch(logoff());

      resetSaveMutation();
    }
  }, [dispatch, getValues, emailChanged, successfullySaved, resetSaveMutation]);

  return (
    <>
      <Box flex={1}>
        <Header
          title={t('titles.account')}
          leftElement={<BackArrow onBeforeNavigation={isDirty ? showCancelWarning : undefined} />}
        />
        <KeyboardAwareScrollView>
          <Content mt={5} position="relative" flex={1}>
            <Center>
              <SmartAvatar name={firstName} />
            </Center>

            <FormProvider {...form}>
              <VStack my={4} space={2} flex={1}>
                <InputField label={t('form.first_name')} name="firstName" maxLength={128} />

                <InputField label={t('form.last_name')} name="lastName" maxLength={128} />

                <InputField
                  label={`${globalT('user.company_code')}`}
                  name="companyCode"
                  maxLength={128}
                  RightElement={<HintIcon>{globalT('tooltip.company_code')}</HintIcon>}
                />

                <InputField label={t('form.email')} name="email" maxLength={320} />

                {emailChanged && (
                  <InputField label={t('form.repeat_email')} name="repeatEmail" maxLength={320} />
                )}

                <InputField label={t('form.country')} name="country" maxLength={128} />

                <InputField label={t('form.state')} name="state" maxLength={128} />

                <InputField label={t('form.city')} name="city" maxLength={128} />
              </VStack>
            </FormProvider>

            <Button onPress={handleSubmit(onSubmit)} isLoading={isSavingUser} isDisabled={!isDirty}>
              {t('buttons.save')}
            </Button>
          </Content>

          <Logo />
        </KeyboardAwareScrollView>
      </Box>

      {error && <ErrorAlert error={error} />}
    </>
  );
}

export default AccountDetails;
