import { Box, Row, Button, Pressable, Column, Text, ScrollView } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-native';

import { HintIcon } from '@app/components/icons';
import { Header, Content, H1, Progress, Logo } from '@app/components';
import { CheckboxField, DatePickerField, RadioGroupField } from '@app/components/form';
import {
  useAppForm,
  useStepper,
  useAppSelector,
  useCommonTranslate,
  useFetchProceduresQuery,
  useNotificationPermissionCheck,
} from '@app/hooks';

import BackButton from '../BackButton';
import { useTranslate, usePersistOnChange } from '../../hooks';
import { PapSmearSchema } from '../../schemas';
import { PapSmearForm } from '../../types';
import { SettingsIcon } from '../icons';
import { selectPapSmear, selectDateOfBirth } from '../../state';
import { getAge } from '../../utils';

import RepeatIn from './RepeatIn';

function PapSmear() {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const { progress, onNext, onFinish } = useStepper();

  const navigate = useNavigate();

  const checkNotificationPermissions = useNotificationPermissionCheck();

  const defaultValues = useAppSelector(selectPapSmear);

  const dateOfBirth = useAppSelector(selectDateOfBirth);

  const age = getAge(dateOfBirth);

  const { data: procedures } = useFetchProceduresQuery();

  const papSmearProcedure = procedures?.find(procedure => procedure.tag === 'papSmear');

  const form = useAppForm<PapSmearForm>(
    {
      defaultValues,
    },
    { schema: PapSmearSchema },
  );

  const { handleSubmit, getValues, setValue, watch } = form;

  function onSubmit() {
    if (age >= 40) {
      onNext(getValues());
    } else {
      onFinish(getValues());
    }
  }

  function navigateUnits() {
    navigate('/private/settings/localization');
  }

  function remindMeToSchedule(value: boolean) {
    if (value) {
      checkNotificationPermissions();
    }
  }

  function enableRepeatIn() {
    const dateTime = 'papSmear.datetime';
    const repeatIn = 'papSmear.repeatEnabled';
    const prevValue = getValues(dateTime);

    !prevValue && setValue(repeatIn, true);
  }

  usePersistOnChange(watch);

  return (
    <FormProvider {...form}>
      <Box flex={1}>
        <Header
          title={t('titles.health_assessment')}
          leftElement={<BackButton />}
          rightElement={
            <Pressable onPress={navigateUnits}>
              <SettingsIcon />
            </Pressable>
          }
        />

        <Progress value={progress} />

        <ScrollView _contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <Content mt={5}>
            <H1>{t('titles.more_screenings')}</H1>

            <FormProvider {...form}>
              <Column mb={4} mt={2} space="2.5">
                <H1 mr={2}>{t('questions.when_was_your_last_pap_smear')}</H1>

                <Box my={4}>
                  <Row alignItems="center">
                    <H1 mr={2}>{t('form.select_date_and_recurrence')}</H1>
                    <HintIcon>{t('tooltip.select_date_and_recurrence')}</HintIcon>
                  </Row>

                  <DatePickerField
                    label={globalT('date')}
                    name="papSmear.datetime"
                    flex={1}
                    mb={3}
                    mt={2}
                    maximumDate={new Date()}
                    onChange={enableRepeatIn}
                  />

                  <RepeatIn name="papSmear" procedure={papSmearProcedure} />
                </Box>

                <Column space={3}>
                  <RadioGroupField
                    name="noNeedPapSmear"
                    accessibilityLabel={t('form.i_do_not_need_pap_smear_anymore')}
                    options={[{ label: t('form.i_do_not_need_pap_smear_anymore'), value: 'true' }]}
                    onChange={() => {
                      setValue('noPapSmear', 'false');
                    }}
                  />

                  <RadioGroupField
                    name="noPapSmear"
                    accessibilityLabel={t('form.i_have_never_had_this_test_done')}
                    options={[{ label: t('form.i_have_never_had_this_test_done'), value: 'true' }]}
                    onChange={() => {
                      setValue('noNeedPapSmear', 'false');
                    }}
                  />

                  <CheckboxField
                    name="remindPapSmearInThreeMonth"
                    accessibilityLabel={t(
                      'form.please_remind_me_in_3_moth_to_schedule_screening_test',
                    )}
                    borderColor="white"
                    bgTheme="green"
                    onChange={remindMeToSchedule}
                  >
                    <Text color="white" w="85%">
                      {t('form.please_remind_me_in_3_moth_to_schedule_screening_test')}
                    </Text>
                  </CheckboxField>
                </Column>
              </Column>
            </FormProvider>

            <Button mt={5} onPress={handleSubmit(onSubmit)}>
              {t('buttons.next')}
            </Button>
          </Content>

          <Logo />
        </ScrollView>
      </Box>
    </FormProvider>
  );
}

export default PapSmear;
