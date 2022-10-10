import { useMemo } from 'react';
import { Box, Row, Button, Text, Pressable, Column, ScrollView } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-native';

import { HintIcon } from '@app/components/icons';
import { Header, Content, H1, Progress, HintBanner, Logo } from '@app/components';
import {
  CheckboxField,
  DatePickerField,
  SelectField,
  RadioGroupField,
  InputField,
} from '@app/components/form';
import {
  useAppForm,
  useStepper,
  useAppSelector,
  useCommonTranslate,
  useFetchHba1cOptionsQuery,
  useNotificationPermissionCheck,
} from '@app/hooks';
import { MEASUREMENT_UNITS, BLOOD_SUGAR_UNITS, CONDITION_NAMES } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';

import BackButton from '../BackButton';
import { useTranslate, usePersistOnChange } from '../../hooks';
import { TellAboutHealthSchema } from '../../schemas';
import { TellAboutHealthForm } from '../../types';
import { SettingsIcon } from '../icons';
import { selectConditions, selectTellAboutHealth } from '../../state';

const unitFormValues = {
  [MEASUREMENT_UNITS.USA]: 'mgDl',
  [MEASUREMENT_UNITS.METRIC]: 'mmolL',
};

function TellAboutHealth() {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const { progress, onNext } = useStepper();

  const navigate = useNavigate();

  const checkNotificationPermissions = useNotificationPermissionCheck();

  const defaultValues = useAppSelector(selectTellAboutHealth);

  const unit = useAppSelector(selectMeasurementUnit);

  const bloodSugarUnit = BLOOD_SUGAR_UNITS[unit];

  const { conditions } = useAppSelector(selectConditions);

  const hasDiabetes = useMemo(() => {
    const conditionsDiabetes = conditions?.filter(
      item =>
        item.name === CONDITION_NAMES.DIABETES_TYPE_2 ||
        item.name === CONDITION_NAMES.DIABETES_TYPE_1,
    );

    return conditionsDiabetes?.some(item => item.value);
  }, [conditions]);

  const hasSleepApnea = useMemo(() => {
    const conditionsSleepApnea = conditions?.filter(
      item => item.name === CONDITION_NAMES.SLEEP_APNEA,
    );

    return conditionsSleepApnea?.some(item => item.value);
  }, [conditions]);

  const { data: hba1cOptions } = useFetchHba1cOptionsQuery();

  const cpapOptions = [
    { label: globalT('yes'), value: 'true' },
    { label: globalT('no'), value: 'false' },
  ];

  const form = useAppForm<TellAboutHealthForm>(
    {
      defaultValues,
    },
    {
      schema: TellAboutHealthSchema,
      context: { format: unit === 'Metric' ? 'XX.XX' : 'XXX' },
    },
  );

  const { handleSubmit, getValues, setValue, watch } = form;

  function onSubmit() {
    onNext(getValues());
  }

  function navigateUnits() {
    navigate('/private/settings/localization');
  }

  function clearLastDiabeticExamField() {
    setValue('lastDiabeticEyeExam', '');
  }

  function clearNoDiabeticExam() {
    setValue('noDiabeticEyeExam', 'false');
  }

  function remindMeToSchedule(value: boolean) {
    if (value) {
      checkNotificationPermissions();
    }
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
            <H1>{t('titles.tell_us_more_about_health')}</H1>

            <Column mb={4} space="2.5">
              {hasDiabetes && (
                <Column space="2.5">
                  <Box mt={5}>
                    <DatePickerField
                      label={t('questions.when_last_diabetic_eye_exam')}
                      name="lastDiabeticEyeExam"
                      maximumDate={new Date()}
                      onChange={clearNoDiabeticExam}
                    />
                  </Box>

                  <RadioGroupField
                    name="noDiabeticEyeExam"
                    accessibilityLabel={t('form.iHaveNeverHadDiabeticEyeExam')}
                    options={[{ label: t('form.iHaveNeverHadDiabeticEyeExam'), value: 'true' }]}
                    onChange={clearLastDiabeticExamField}
                  />

                  <CheckboxField
                    name="remindDiabeticEyeExamInOneMonth"
                    accessibilityLabel={t('form.remindMeToScheduleEyeExam')}
                    borderColor="white"
                    bgTheme="green"
                    onChange={remindMeToSchedule}
                  >
                    <Text fontSize="16px" color="white" w="85%">
                      {t('form.remindMeToScheduleEyeExam')}
                    </Text>
                  </CheckboxField>

                  <DatePickerField
                    label={t('questions.when_next_diabetic_eye_exam')}
                    name="nextDiabeticEyeExam"
                    minimumDate={new Date()}
                  />
                </Column>
              )}

              {hasDiabetes && (
                <Column space="2.5">
                  <H1 my={2.5}>{t('questions.what_was_your_last_blood_sugar_reading')}</H1>

                  <InputField
                    label={`${t('form.randomBloodSugar')}, ${bloodSugarUnit}`}
                    keyboardType="numeric"
                    name={`randomBloodSugar.${unitFormValues[unit]}`}
                    RightElement={<HintIcon>{t('tooltip.randomBloodSugar')}</HintIcon>}
                    maxLength={unit === 'Metric' ? 5 : 3}
                  />

                  <InputField
                    label={`${globalT('goal')}, ${bloodSugarUnit}`}
                    keyboardType="numeric"
                    name={`goalRandomBloodSugar.${unitFormValues[unit]}`}
                    maxLength={unit === 'Metric' ? 5 : 3}
                  />

                  <InputField
                    label={`${t('form.fastingBloodSugar')}, ${bloodSugarUnit}`}
                    keyboardType="numeric"
                    name={`fastingBloodSugar.${unitFormValues[unit]}`}
                    RightElement={<HintIcon>{t('tooltip.fastingBloodSugar')}</HintIcon>}
                    maxLength={unit === 'Metric' ? 5 : 3}
                  />

                  <InputField
                    label={`${globalT('goal')}, ${bloodSugarUnit}`}
                    keyboardType="numeric"
                    name={`goalFastingBloodSugar.${unitFormValues[unit]}`}
                    maxLength={unit === 'Metric' ? 5 : 3}
                  />

                  <InputField
                    label={`${t('form.afterMealBloodSugar')}, ${bloodSugarUnit}`}
                    keyboardType="numeric"
                    name={`afterMealBloodSugar.${unitFormValues[unit]}`}
                    RightElement={<HintIcon>{t('tooltip.afterMealBloodSugar')}</HintIcon>}
                    maxLength={unit === 'Metric' ? 5 : 3}
                  />

                  <InputField
                    label={`${globalT('goal')}, ${bloodSugarUnit}`}
                    keyboardType="numeric"
                    name={`goalAfterMealBloodSugar.${unitFormValues[unit]}`}
                    maxLength={unit === 'Metric' ? 5 : 3}
                  />
                </Column>
              )}

              <H1 my={2.5}>{t('questions.what_are_your_cholesterol_level')}</H1>

              <InputField
                label={`${t('form.ldlLevel')}, ${bloodSugarUnit}`}
                keyboardType="numeric"
                name={`ldl.${unitFormValues[unit]}`}
                maxLength={unit === 'Metric' ? 5 : 3}
              />

              <InputField
                label={`${t('form.ldlGoal')}, ${bloodSugarUnit}`}
                keyboardType="numeric"
                name={`goalLdl.${unitFormValues[unit]}`}
                maxLength={unit === 'Metric' ? 5 : 3}
              />

              <InputField
                label={`${t('form.triglycerideLevel')}, ${bloodSugarUnit}`}
                keyboardType="numeric"
                name={`triglyceride.${unitFormValues[unit]}`}
                maxLength={unit === 'Metric' ? 5 : 4}
              />

              <Row my={2.5} alignItems="center">
                <H1 mr={2}>{t('questions.what_was_your_last_hba1c')}</H1>
                <HintIcon>{t('tooltip.lastHba1c')}</HintIcon>
              </Row>

              <SelectField
                label={t('form.last_hba1c')}
                name="hba1c.percent"
                options={hba1cOptions}
              />

              <DatePickerField
                label={t('form.date_last_hba1c')}
                name="hba1c.datetime"
                maximumDate={new Date()}
              />

              <Row my={2.5} alignItems="center">
                <H1 mr={2}>{t('questions.what_was_your_hba1c_goal')}</H1>
                <HintIcon>{t('tooltip.goalHba1c')}</HintIcon>
              </Row>

              <SelectField label={t('form.goal_hba1c')} name="goalHba1c" options={hba1cOptions} />

              {hasSleepApnea && (
                <Column>
                  <H1 my={2.5}>{t('questions.do_you_have_cpap')}</H1>
                  <RadioGroupField
                    direction="row"
                    name="cpap"
                    accessibilityLabel={t('questions.do_you_have_cpap')}
                    options={cpapOptions}
                  />
                </Column>
              )}
            </Column>

            <HintBanner>{t('hint.you_can_provide_info_later')}</HintBanner>

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

export default TellAboutHealth;
