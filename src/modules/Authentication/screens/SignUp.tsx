import { useState, useEffect, SyntheticEvent } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Button,
  HStack,
  Text,
  Modal,
  ScrollView,
} from 'native-base';
import { useNavigate } from 'react-router-native';
import { FormProvider } from 'react-hook-form';

import { Content, AppLink, ErrorAlert, Checkbox, KeyboardAvoidingBox, Logo } from '@app/components';
import { InputField } from '@app/components/form';
import {
  MailIcon,
  UserIcon,
  LockIcon,
  HintIcon,
  ShowPasswordIcon,
  PasswordHintIcon,
} from '@app/components/icons';
import { showConfirmCancellationWarning } from '@app/utils';
import { useAppForm, useCommonTranslate, useBlocker } from '@app/hooks';

import { useSignUpMutation, useTranslate } from '../hooks';

import { LocalizationBar, Header } from '../components';
import { SignUpSchema } from '../schemas';
import { SignUpForm } from '../types';

const SignUp = () => {
  const form = useAppForm<SignUpForm>(
    {
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
      },
    },
    { schema: SignUpSchema },
  );

  const {
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = form;

  const globalT = useCommonTranslate();
  const t = useTranslate();

  const [isPasswordShown, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShow] = useState(false);
  const [accepted, setAccept] = useState<boolean>(false);
  const [isPATModalOpen, setPATModalOpen] = useState(false);

  const navigate = useNavigate();

  const [signUp, { isLoading, isSuccess: isSuccessSignedUp, error }] = useSignUpMutation();

  const onSubmit = ({ email, password, username }: SignUpForm) => {
    signUp({ email, password, username });
  };

  const openPATModal = (e: SyntheticEvent) => {
    e.preventDefault();
    setPATModalOpen(state => !state);
  };

  const closePATModal = () => {
    setPATModalOpen(false);
  };

  const checkWithClosePopUp = () => {
    setAccept(state => !state);

    if (!accepted) {
      setPATModalOpen(false);
    }
  };

  const togglePassword = () => {
    setIsPasswordShow(isShown => !isShown);
  };

  const toggleConfirmPassword = () => {
    setIsConfirmPasswordShow(isShown => !isShown);
  };

  useEffect(() => {
    if (isSuccessSignedUp) {
      navigate('/public/thanks-for-join', { state: { username: getValues().username } });
    }
  }, [isSuccessSignedUp, getValues, navigate]);

  useBlocker(tx => {
    showConfirmCancellationWarning({
      onConfirm: () => tx.retry(),
    });
  }, isDirty && !isSuccessSignedUp);

  return (
    <Box flex={1}>
      <KeyboardAvoidingBox>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Content mt={2} flex={1}>
            <Header>
              <LocalizationBar />
            </Header>

            <Box mt={2} flex={1}>
              <Heading color="white" mb={5}>
                {t('titles.signup')}
              </Heading>

              <FormProvider {...form}>
                <VStack space={2.5} mb={2.5} flex={1}>
                  <InputField label={t('form.email')} name="email" LeftElement={<MailIcon />} />

                  <InputField
                    label={t('form.repeat_email')}
                    name="repeatEmail"
                    LeftElement={<MailIcon />}
                  />

                  <InputField
                    label={t('form.username')}
                    name="username"
                    LeftElement={<UserIcon />}
                    RightElement={<HintIcon>{t('hints.username')}</HintIcon>}
                  />

                  <InputField
                    label={t('form.create_password')}
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

                  <FormControl>
                    <Checkbox
                      name="acceptedPAT"
                      value="acceptedPAT"
                      isChecked={accepted}
                      accessibilityLabel="I accept Policy and Terms"
                      borderColor="white"
                      onChange={checkWithClosePopUp}
                    >
                      <Text color="white" fontSize="md" pl="2" onPress={openPATModal}>
                        {t('i_accept')}{' '}
                        <Text fontWeight={500} textDecorationLine="underline">
                          {t('policy_and_terms')}
                        </Text>
                      </Text>
                    </Checkbox>
                  </FormControl>
                </VStack>
              </FormProvider>
            </Box>

            <Box>
              <Button
                isLoading={isLoading}
                isDisabled={!accepted}
                onPress={handleSubmit(onSubmit)}
                mb="30px"
              >
                {t('buttons.next')}
              </Button>

              <HStack>
                <Text
                  fontSize="md"
                  color="white"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  {t('questions.have_account')}{' '}
                </Text>

                <AppLink to="/public/login">{t('login')}</AppLink>
              </HStack>
            </Box>

            <AppLink mt={5} to="/public/licenses">
              {globalT('actions.open_source_software_used')}
            </AppLink>

            <Modal isOpen={isPATModalOpen} onClose={closePATModal} px={4}>
              <Modal.Content bg="white" borderRadius={4} maxW="full" w="full">
                <Modal.CloseButton />

                <Modal.Body mt={10}>
                  <Heading>{t('patTitle')}</Heading>

                  <Text color="gray.500" fontSize="14px" mt={2}>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                    in a piece of classical Latin literature from 45 BC, making it over 2000 years
                    old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words, consectetur, from a
                    Lorem Ipsum passage, and going through the cites of the word in classical
                    literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and
                    Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
                    ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                    Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard
                    chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                    interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by
                    Cicero are also reproduced in their exact original form, accompanied by English
                    versions from the 1914 translation by H. Rackham.
                  </Text>

                  <Checkbox
                    mt={5}
                    mb={8}
                    w={72}
                    value="acceptedPAT"
                    name="acceptedPAT"
                    isChecked={accepted}
                    accessibilityLabel={`${t('i_accept')} ${t('policy_and_terms')}`}
                    onChange={checkWithClosePopUp}
                  >
                    {t('confirm_policy')}
                  </Checkbox>
                </Modal.Body>
              </Modal.Content>
            </Modal>

            {error && <ErrorAlert error={error}></ErrorAlert>}
          </Content>

          <Logo />
        </ScrollView>
      </KeyboardAvoidingBox>
    </Box>
  );
};

export default SignUp;
