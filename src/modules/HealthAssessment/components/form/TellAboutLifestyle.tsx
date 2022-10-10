import { Box, Row, Button, Pressable, Column, Text, ScrollView } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-native';

import { HintIcon } from '@app/components/icons';
import { Header, Content, H1, Progress, Logo } from '@app/components';
import { CheckboxField, RadioGroupField, InputField, SliderField } from '@app/components/form';
import { useAppForm, useStepper, useAppSelector, useCommonTranslate } from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { VOLUME_UNITS } from '@app/constants';
import { dismissKeyboard } from '@app/utils';

import BackButton from '../BackButton';
import { useTranslate, usePersistOnChange } from '../../hooks';
import { TellAboutLifestyleSchema } from '../../schemas';
import { TellAboutLifestyleForm } from '../../types';
import { SettingsIcon } from '../icons';
import { selectTellAboutLifestyle, selectDateOfBirth, selectGender } from '../../state';
import { AGE_45, STEPS, GENDER } from '../../constants';
import { getAge } from '../../utils';

function TellAboutLifestyle() {
  const globalT = useCommonTranslate();

  const t = useTranslate();

  const { progress, onNext, onFinish } = useStepper();

  const navigate = useNavigate();

  const defaultValues = useAppSelector(selectTellAboutLifestyle);

  const dateOfBirth = useAppSelector(selectDateOfBirth);

  const gender = useAppSelector(selectGender);

  const unit = useAppSelector(selectMeasurementUnit);

  const volumeUnit = VOLUME_UNITS[unit];

  const age = getAge(dateOfBirth);

  const form = useAppForm<TellAboutLifestyleForm>(
    {
      defaultValues,
    },
    { schema: TellAboutLifestyleSchema },
  );

  const hasDepressionOptions = [
    { label: globalT('yes'), value: 'true' },
    { label: globalT('no'), value: 'false' },
  ];

  const { handleSubmit, getValues, setValue, watch } = form;

  function onSubmit() {
    if (age >= AGE_45) {
      onNext(getValues());
    } else if (gender == GENDER.FEMALE && age >= 21) {
      onNext(getValues(), STEPS.PAP_SMEAR);
    } else {
      onFinish(getValues());
    }
  }

  function navigateUnits() {
    navigate('/private/settings/localization');
  }

  function unselectNoneOfAbove() {
    setValue('none', false);
  }

  function changeNoneOfAbove(value: unknown) {
    if (value) {
      const fields = [
        'reverseOrBetterManage',
        'loseWeight',
        'improveLabWorkWithoutMedications',
        'feelBetter',
        'lowerHealthcareCost',
        'decreaseOrGetOffMedications',
      ] as (keyof TellAboutLifestyleForm)[];
      fields.forEach(name => setValue(name, false));
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

        <ScrollView _contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Content my={5}>
            <H1>{t('titles.tell_us_about_your_lifestyle')}</H1>
            <Column mb={4} mt={5} space="2.5">
              <InputField
                label={`${t('form.average_water_intake')}, ${globalT(`volume.${volumeUnit}`)}`}
                keyboardType="numeric"
                name="averageDailyWaterIntake"
                maxLength={unit === 'USA' ? 3 : 4}
              />

              <InputField
                label={`${t('form.average_hours_sleep_nightly')}, hours`}
                keyboardType="numeric"
                name="averageDailySleepHours"
                maxLength={4}
              />

              <H1 my={2.5} display="flex">
                {t('form.rate_quality_sleep')}
              </H1>

              <SliderField name="sleepQualityRating" defaultValue={5} minValue={1} maxValue={10} />

              <Row my={2.5} alignItems="center">
                <H1>
                  {t('questions.do_you_suffer_from_depression_or_anxiety')}
                  <Box mb={1} pl={2}>
                    <HintIcon>{t('tooltip.do_you_suffer_from_depression_or_anxiety')}</HintIcon>
                  </Box>
                </H1>
              </Row>

              <RadioGroupField
                name="hasDepressionOrAnxiety"
                accessibilityLabel={t('questions.do_you_suffer_from_depression_or_anxiety')}
                options={hasDepressionOptions}
                onChange={() => setValue('noAnswerOnDepressionOrAnxiety', 'false')}
              />

              <RadioGroupField
                direction="row"
                name="noAnswerOnDepressionOrAnxiety"
                accessibilityLabel={t('questions.do_you_suffer_from_depression_or_anxiety')}
                options={[{ label: t('form.i_would_rather_not_say'), value: 'true' }]}
                onChange={() => setValue('hasDepressionOrAnxiety', '')}
              />

              <H1 my={2.5} display="flex">
                {t('form.rate_overall_health')}
              </H1>

              <SliderField name="overallHealthRating" defaultValue={5} minValue={1} maxValue={10} />

              <H1 mr={2} my={2.5} display="flex">
                {t('questions.what_do_you_want_from_your_VitalOp_journey')}
              </H1>

              <Text color="white">{t('form.check_all_that_apply')}</Text>

              <CheckboxField
                name="reverseOrBetterManage"
                accessibilityLabel={t('form.reverse_or_better_manage_health_conditions')}
                borderColor="white"
                bgTheme="green"
                onChange={unselectNoneOfAbove}
              >
                <Text color="white" w="85%">
                  {t('form.reverse_or_better_manage_health_conditions')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="loseWeight"
                accessibilityLabel={t('form.lose_weight')}
                borderColor="white"
                bgTheme="green"
                onChange={unselectNoneOfAbove}
              >
                <Text color="white" w="85%">
                  {t('form.lose_weight')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="improveLabWorkWithoutMedications"
                accessibilityLabel={t('form.improve_lab_work_without_adding_medications')}
                borderColor="white"
                bgTheme="green"
                onChange={unselectNoneOfAbove}
              >
                <Text color="white" w="85%">
                  {t('form.improve_lab_work_without_adding_medications')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="feelBetter"
                accessibilityLabel={t('form.feel_better_i_am_sick_and_tired')}
                borderColor="white"
                bgTheme="green"
                onChange={unselectNoneOfAbove}
              >
                <Text color="white" w="85%">
                  {t('form.feel_better_i_am_sick_and_tired')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="lowerHealthcareCost"
                accessibilityLabel={t('form.lower_my_healthcare_cost')}
                borderColor="white"
                bgTheme="green"
                onChange={unselectNoneOfAbove}
              >
                <Text color="white" w="85%">
                  {t('form.lower_my_healthcare_cost')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="decreaseOrGetOffMedications"
                accessibilityLabel={t('form.decrease_or_get_off_medications')}
                borderColor="white"
                bgTheme="green"
                onChange={unselectNoneOfAbove}
              >
                <Text color="white" w="85%">
                  {t('form.decrease_or_get_off_medications')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="none"
                accessibilityLabel={t('form.noneOfAbove')}
                borderColor="white"
                bgTheme="green"
                onChange={changeNoneOfAbove}
              >
                <Text color="white" w="85%">
                  {t('form.noneOfAbove')}
                </Text>
              </CheckboxField>

              <H1 my={2}>{t('questions.what_makes_it_difficult_to_live_healthy_lifestyle')}</H1>

              <Text color="white">{t('form.check_all_that_apply')}</Text>

              <CheckboxField
                name="money"
                accessibilityLabel={t('form.money')}
                borderColor="white"
                bgTheme="green"
              >
                <Text color="white" w="85%">
                  {t('form.money')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="time"
                accessibilityLabel={t('form.time')}
                borderColor="white"
                bgTheme="green"
              >
                <Text color="white" w="85%">
                  {t('form.time')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="energy"
                accessibilityLabel={t('form.energy')}
                borderColor="white"
                bgTheme="green"
              >
                <Text color="white" w="85%">
                  {t('form.energy')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="socialLife"
                accessibilityLabel={t('form.social_life')}
                borderColor="white"
                bgTheme="green"
              >
                <Text color="white" w="85%">
                  {t('form.social_life')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="unsureWhatToDo"
                accessibilityLabel={t('form.unsure_what_to_do')}
                borderColor="white"
                bgTheme="green"
              >
                <Text color="white" w="85%">
                  {t('form.unsure_what_to_do')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="emotionalConnectWithFoodDrinks"
                accessibilityLabel={t('form.emotional_connection_with_food_drinks')}
                borderColor="white"
                bgTheme="green"
              >
                <Text color="white" w="85%">
                  {t('form.emotional_connection_with_food_drinks')}
                </Text>
              </CheckboxField>

              <CheckboxField
                name="liveHealthyLifestyle"
                accessibilityLabel={t('form.i_live_healthy_lifestyle')}
                borderColor="white"
                bgTheme="green"
              >
                <Text color="white" w="85%">
                  {t('form.i_live_healthy_lifestyle')}
                </Text>
              </CheckboxField>

              <InputField flex={1} label={t('form.other')} name="other" />
            </Column>

            <Button mt={2.5} onPress={dismissKeyboard(handleSubmit(onSubmit))}>
              {t('buttons.next')}
            </Button>
          </Content>

          <Logo />
        </ScrollView>
      </Box>
    </FormProvider>
  );
}

export default TellAboutLifestyle;
