import { useState, useMemo, PropsWithChildren, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import {
  Box,
  Heading,
  VStack,
  Button,
  Input,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'native-base';
import { useNavigate } from 'react-router-native';

import { useAppDispatch, useCommonTranslate } from '@app/hooks';
import { referralQuestionnaireCompleted } from '@app/state';
import { ErrorAlert, Logo } from '@app/components';

import { CheckMarkIcon } from '../components/icons';
import { useSendReferralMutation, useTranslate } from '../hooks';

type Props = PropsWithChildren<{
  value: string;
  label: string;
  isActive: boolean;
  onPress: () => unknown;
}>;

type ReferralOption = {
  type: string;
  title: string;
  body?: {
    name: string;
    placeHolder: string;
  };
};

const Option = (props: Props) => {
  return (
    <Box>
      <Pressable onPress={props.onPress}>
        <Box
          bg="white"
          _text={{ color: 'black', fontWeight: 'medium' }}
          pr="36px"
          minH="56px"
          px={4}
          rounded={4}
          justifyContent="center"
        >
          {props.label}
        </Box>
      </Pressable>

      {props.isActive && (
        <>
          <Box position="absolute" right="14px" top="18px">
            <CheckMarkIcon />
          </Box>

          {props.children && <Box mt="10px">{props.children}</Box>}
        </>
      )}
    </Box>
  );
};

const ReferralQuestionnaire = () => {
  const [referral, setReferral] = useState<Maybe<ReferralOption>>(null);
  const [referralValue, setReferralValue] = useState('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [sendReferral, { isLoading: isSendingReferral, isSuccess: successfullySent, error }] =
    useSendReferralMutation();

  const t = useTranslate();
  const globalT = useCommonTranslate();

  const referrals: ReferralOption[] = useMemo(
    () => [
      {
        type: 'PHYSICIAN_OR_HEALTH_CARE_PROVIDER',
        title: t('checkboxes.physician'),
        body: {
          name: 'provider',
          placeHolder: t('descriptions.enter_physican_name'),
        },
      },
      {
        type: 'INSURANCE_COMPANY',
        title: t('checkboxes.insurance_company'),
        body: {
          name: 'insurance',
          placeHolder: t('descriptions.enter_insurance_company'),
        },
      },
      {
        type: 'FRIEND',
        title: t('checkboxes.friend'),
      },
      {
        type: 'SOCIAL_MEDIA_OR_ONLINE_ADVERTISING',
        title: t('checkboxes.social_media'),
      },
      {
        type: 'NO_ONE_I_AM_AWESOME',
        title: t('checkboxes.no_one'),
      },
      {
        type: 'OTHER',
        title: t('checkboxes.other'),
        body: {
          name: 'other',
          placeHolder: t('descriptions.enter_other'),
        },
      },
    ],
    [t],
  );

  const toggleCheckbox = (value: ReferralOption) => {
    setReferral(state => (state === value ? null : value));
    setReferralValue('');
  };

  const isDisabled = !referral || (referral.body && !referralValue.trim());

  const submit = () => {
    if (referral) {
      sendReferral({
        referralType: referral.type,
        referralValue: referralValue.trim(),
      });
    }
  };

  useEffect(() => {
    if (successfullySent) {
      dispatch(referralQuestionnaireCompleted());
      navigate('/private/referral-questions/welcome');
    }
  }, [navigate, dispatch, successfullySent]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      _ios={{
        flex: 1,
      }}
      _android={{
        flexGrow: 1,
      }}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight ?? 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        _contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      >
        <Box px="4" safeArea>
          <Heading my="20px" color="white">
            {t('titles.how_did_you_hear')}
          </Heading>

          <VStack space="10px">
            {referrals.map((option: ReferralOption) => {
              const { type, title, body } = option;
              const hasInput = !!body;

              return (
                <Option
                  label={title}
                  value={type}
                  key={type}
                  isActive={referral === option}
                  onPress={() => toggleCheckbox(option)}
                >
                  {hasInput && (
                    <Input onChangeText={setReferralValue} placeholder={body.placeHolder} />
                  )}
                </Option>
              );
            })}
          </VStack>

          <Button isLoading={isSendingReferral} isDisabled={isDisabled} mt={3} onPress={submit}>
            {globalT('next')}
          </Button>
        </Box>

        <Logo />
      </ScrollView>

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </KeyboardAvoidingView>
  );
};
export default ReferralQuestionnaire;
