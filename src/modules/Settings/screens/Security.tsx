import { useEffect, useState } from 'react';
import { Box, Row, Column, Button, ScrollView } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { Header, Content, BackArrow, H1, ErrorAlert } from '@app/components';
import { InputField } from '@app/components/form';
import { PasswordHintIcon, ShowPasswordIcon } from '@app/components/icons';
import { useAppForm, useAppSelector, useLogout } from '@app/hooks';
import { selectAccessToken } from '@app/state';
import { showConfirmCancellationWarning } from '@app/utils';

import { useTranslate, useChangePasswordMutation } from '../hooks';
import { ChangePasswordForm } from '../types';
import { ChangePasswordSchema } from '../schemas';

function Security() {
  const t = useTranslate();
  const logout = useLogout();

  const accessToken = useAppSelector(selectAccessToken);

  const [isPasswordShown, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShow] = useState(false);

  const form = useAppForm<ChangePasswordForm>(
    {
      defaultValues: {
        prevPassword: '',
        proposedPassword: '',
        confirmPassword: '',
      },
    },
    { schema: ChangePasswordSchema },
  );

  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const [
    changePassword,
    { isLoading: isChangingPassword, isSuccess: successfullyChangedPassword, error },
  ] = useChangePasswordMutation();

  function togglePassword() {
    setIsPasswordShow(isPasswordShown => !isPasswordShown);
  }

  function toggleConfirmPassword() {
    setIsConfirmPasswordShow(isPasswordShown => !isPasswordShown);
  }

  function submit(data: ChangePasswordForm) {
    if (accessToken) {
      changePassword({
        ...data,
        accessToken,
      });
    } else {
      throw Error('[Security]: no access token provided');
    }
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
    if (successfullyChangedPassword) {
      logout();
    }
  }, [logout, successfullyChangedPassword]);

  return (
    <ScrollView>
      <Box>
        <Header
          title={t('titles.security')}
          leftElement={<BackArrow onBeforeNavigation={isDirty ? showWarning : undefined} />}
        />

        <Content mt={5}>
          <H1 mb={2.5}>{t('titles.change_password')}</H1>

          <FormProvider {...form}>
            <Column mb={5} space={2}>
              <InputField type="password" label={t('form.current_password')} name="prevPassword" />

              <InputField
                label={t('form.new_password')}
                name="proposedPassword"
                type={isPasswordShown ? 'text' : 'password'}
                RightElement={
                  <Row alignItems="center">
                    <Box mr={3}>
                      <PasswordHintIcon />
                    </Box>
                    <ShowPasswordIcon onPress={togglePassword} />
                  </Row>
                }
              />

              <InputField
                label={t('form.repeat_password')}
                name="confirmPassword"
                type={isConfirmPasswordShown ? 'text' : 'password'}
                RightElement={<ShowPasswordIcon onPress={toggleConfirmPassword} />}
              />
            </Column>
          </FormProvider>

          <Button
            onPress={handleSubmit(submit)}
            isDisabled={!isDirty}
            isLoading={isChangingPassword}
          >
            {t('buttons.submit')}
          </Button>
        </Content>
      </Box>

      {error && <ErrorAlert error={error} />}
    </ScrollView>
  );
}

export default Security;
