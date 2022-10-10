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
  useNotificationPermissionCheck,
  useFetchProceduresQuery,
} from '@app/hooks';

import BackButton from '../BackButton';
import { useTranslate, usePersistOnChange } from '../../hooks';
import { ScreeningTestSchema } from '../../schemas';
import { ScreeningTestForm } from '../../types';
import { SettingsIcon } from '../icons';
import { selectScreeningTest, selectGender, selectDateOfBirth } from '../../state';
import { GENDER } from '../../constants';
import { getAge } from '../../utils';

import { RepeatIn } from '.';

function ScreeningTest() {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const { progress, onNext, onFinish } = useStepper();

  const navigate = useNavigate();

  const checkNotificationPermissions = useNotificationPermissionCheck();

  const defaultValues = useAppSelector(selectScreeningTest);

  const dateOfBirth = useAppSelector(selectDateOfBirth);

  const gender = useAppSelector(selectGender);

  const age = getAge(dateOfBirth);

  const { data: procedures } = useFetchProceduresQuery();

  const bloodStoolProcedure = procedures?.find(procedure => procedure.tag === 'bloodStoolTesting');
  const cologuardProcedure = procedures?.find(procedure => procedure.tag === 'cologuard');
  const colonoscopyProcedure = procedures?.find(procedure => procedure.tag === 'colonoscopy');
  const colonographyProcedure = procedures?.find(procedure => procedure.tag === 'colonography');

  const form = useAppForm<ScreeningTestForm>(
    {
      defaultValues,
    },
    { schema: ScreeningTestSchema },
  );

  const { handleSubmit, getValues, setValue, watch } = form;

  function onSubmit() {
    if (gender == GENDER.FEMALE && age >= 21) {
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

  function enableRepeatInOnField(fieldName: keyof ScreeningTestForm) {
    return () => {
      const dateTime = `${fieldName}.datetime` as keyof ScreeningTestForm;
      const repeatIn = `${fieldName}.repeatEnabled` as keyof ScreeningTestForm;
      const prevValue = getValues(dateTime);

      !prevValue && setValue(repeatIn, true);
    };
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

        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <Content my={5}>
            <H1>{t('titles.tell_us_about_your_screening_test')}</H1>
            <H1 mr={2}>{t('questions.when_was_your_last_screening')}</H1>

            <Column mt={6} space={12}>
              <Box>
                <H1>{t('form.blood_stool_testing')}</H1>

                <Row alignItems="center">
                  <H1 mr={2}>{t('form.select_date_and_recurrence')}</H1>
                  <HintIcon>{t('tooltip.select_date_and_recurrence')}</HintIcon>
                </Row>

                <DatePickerField
                  label={globalT('date')}
                  name="bloodStoolTesting.datetime"
                  flex={1}
                  mb={3}
                  mt={2}
                  maximumDate={new Date()}
                  onChange={enableRepeatInOnField('bloodStoolTesting')}
                />

                <RepeatIn name="bloodStoolTesting" procedure={bloodStoolProcedure} />
              </Box>

              <Box>
                <H1>{t('form.cologuard')}</H1>

                <Row alignItems="center">
                  <H1 mr={2}>{t('form.select_date_and_recurrence')}</H1>
                  <HintIcon>{t('tooltip.select_date_and_recurrence')}</HintIcon>
                </Row>

                <DatePickerField
                  label={globalT('date')}
                  name="cologuard.datetime"
                  flex={1}
                  mb={3}
                  mt={2}
                  maximumDate={new Date()}
                  onChange={enableRepeatInOnField('cologuard')}
                />

                <RepeatIn name="cologuard" procedure={cologuardProcedure} />
              </Box>

              <Box>
                <H1>{t('form.colonoscopy')}</H1>

                <Row alignItems="center">
                  <H1 mr={2}>{t('form.select_date_and_recurrence')}</H1>
                  <HintIcon>{t('tooltip.select_date_and_recurrence')}</HintIcon>
                </Row>

                <DatePickerField
                  label={globalT('date')}
                  name="colonoscopy.datetime"
                  flex={1}
                  mb={3}
                  mt={2}
                  maximumDate={new Date()}
                  onChange={enableRepeatInOnField('colonoscopy')}
                />

                <RepeatIn name="colonoscopy" procedure={colonoscopyProcedure} />
              </Box>

              <Box>
                <H1>{t('form.ct_colonography')}</H1>

                <Row alignItems="center">
                  <H1 mr={2}>{t('form.select_date_and_recurrence')}</H1>
                  <HintIcon>{t('tooltip.select_date_and_recurrence')}</HintIcon>
                </Row>

                <DatePickerField
                  label={globalT('date')}
                  name="colonography.datetime"
                  flex={1}
                  mb={3}
                  mt={2}
                  maximumDate={new Date()}
                  onChange={enableRepeatInOnField('colonography')}
                />

                <RepeatIn name="colonography" procedure={colonographyProcedure} />
              </Box>

              <Column space={3}>
                <RadioGroupField
                  key={'noColonScreening'}
                  name="noColonScreening"
                  accessibilityLabel={t('form.i_have_never_had_any_these_tests')}
                  options={[{ label: t('form.i_have_never_had_any_these_tests'), value: 'true' }]}
                  onChange={() => {
                    setValue('noNeedColonScreening', 'false');
                  }}
                />

                <RadioGroupField
                  key={'noNeedColonScreening'}
                  name="noNeedColonScreening"
                  accessibilityLabel={t('form.i_dont_need_these_tests')}
                  options={[{ label: t('form.i_dont_need_these_tests'), value: 'true' }]}
                  onChange={() => {
                    setValue('noColonScreening', 'false');
                  }}
                />

                <CheckboxField
                  name="remindColonScreeningInThreeMonth"
                  accessibilityLabel={t('form.remind_me_in_3_month_to_schedule_colon_screening')}
                  borderColor="white"
                  bgTheme="green"
                  onChange={remindMeToSchedule}
                >
                  <Text color="white" w="85%">
                    {t('form.remind_me_in_3_month_to_schedule_colon_screening')}
                  </Text>
                </CheckboxField>
              </Column>
            </Column>

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

export default ScreeningTest;
