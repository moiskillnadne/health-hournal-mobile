import { Box, Row, Button, Pressable, Column, Text, ScrollView } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-native';

import { HintIcon } from '@app/components/icons';
import { Header, Content, H1, Progress, HintBanner, Logo } from '@app/components';
import { CheckboxField, DatePickerField, InputMaskField } from '@app/components/form';
import {
  useAppForm,
  useStepper,
  useAppSelector,
  useFetchFrequencyQuery,
  useFetchPeriodsQuery,
  useFetchCurrencyQuery,
  useCommonTranslate,
} from '@app/hooks';
import { BLOOD_PRESSURE_UNIT } from '@app/constants';

import BackButton from '../BackButton';
import { useTranslate, usePersistOnChange } from '../../hooks';
import { AnswerMoreQuestionsSchema } from '../../schemas';
import { AnswerMoreQuestionsForm, Medication as TMedication } from '../../types';
import { SettingsIcon } from '../icons';
import { selectAnswerMoreQuestions } from '../../state';
import { Medication } from '../../entities';
import MedicationItem from './MedicationItem';

const MASK = '999';

function AnswerMoreQuestions() {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const { progress, onNext } = useStepper();

  const navigate = useNavigate();

  const { data: frequencies } = useFetchFrequencyQuery();

  const { data: periods } = useFetchPeriodsQuery();

  const { data: currencies } = useFetchCurrencyQuery();

  const defaultValues = useAppSelector(selectAnswerMoreQuestions);

  const form = useAppForm<AnswerMoreQuestionsForm>(
    {
      defaultValues,
    },
    { schema: AnswerMoreQuestionsSchema },
  );

  const { handleSubmit, getValues, watch, setValue } = form;

  const medications = watch('medications');

  function onSubmit() {
    onNext(getValues());
  }

  function navigateUnits() {
    navigate('/private/settings/localization');
  }

  function removeItem(item: TMedication) {
    setValue(
      'medications',
      medications?.filter(medication => medication !== item),
    );
  }

  function addItem() {
    if (medications) {
      setValue('medications', [...medications, Medication()]);
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
            <H1>{t('titles.please_answer_few_more_questions')}</H1>

            <Column mt={5} mb={4} space="2.5">
              {medications?.map((item, index) => (
                <MedicationItem
                  key={item.uuid}
                  name={`medications[${index}]`}
                  removeItem={() => removeItem(item)}
                  addItem={addItem}
                  isFirst={index === 0}
                  isLast={index === medications.length - 1}
                  currencies={currencies}
                  frequencies={frequencies}
                  periods={periods}
                />
              ))}

              <H1 my={2.5}>{t('questions.what_was_your_last_blood_pressure_reading')}</H1>

              <Row alignItems="center" space={1}>
                <InputMaskField
                  flex={1}
                  label={`${t('form.systolic')}, ${BLOOD_PRESSURE_UNIT}`}
                  keyboardType="numeric"
                  name="bloodPressure.systolic"
                  options={{
                    mask: MASK,
                  }}
                />

                <Text fontSize={22} color="white" fontWeight={600}>
                  /
                </Text>

                <InputMaskField
                  flex={1}
                  label={`${t('form.diastolic')}, ${BLOOD_PRESSURE_UNIT}`}
                  keyboardType="numeric"
                  name="bloodPressure.diastolic"
                  options={{
                    mask: MASK,
                  }}
                />
              </Row>

              <DatePickerField
                label={globalT('date')}
                name="bloodPressure.datetime"
                maximumDate={new Date()}
              />

              <Row mt={2.5} alignItems="center">
                <H1 mr={2}>{globalT('goal')}</H1>
                <HintIcon>{t('tooltip.bloodPressureGoal')}</HintIcon>
              </Row>

              <Row alignItems="center" space={1}>
                <InputMaskField
                  flex={1}
                  label={`${t('form.systolic')}, ${BLOOD_PRESSURE_UNIT}`}
                  keyboardType="numeric"
                  name="goalPressureSystolic"
                  options={{
                    mask: MASK,
                  }}
                />

                <Text fontSize={22} color="white" fontWeight={600}>
                  /
                </Text>

                <InputMaskField
                  flex={1}
                  label={`${t('form.diastolic')}, ${BLOOD_PRESSURE_UNIT}`}
                  keyboardType="numeric"
                  name="goalPressureDiastolic"
                  options={{
                    mask: MASK,
                  }}
                />
              </Row>

              <Box my={2.5}>
                <CheckboxField
                  name="noBloodPressureCheck"
                  accessibilityLabel={t('form.iDoNotCheckMyBloodPressure')}
                  borderColor="white"
                  bgTheme="green"
                >
                  <Text fontSize="16px" color="white" w="85%">
                    {t('form.iDoNotCheckMyBloodPressure')}
                  </Text>
                </CheckboxField>
              </Box>

              <HintBanner>{t('hint.you_can_provide_info_later')}</HintBanner>
            </Column>

            <Button mt={2.5} onPress={handleSubmit(onSubmit)}>
              {t('buttons.next')}
            </Button>
          </Content>

          <Logo />
        </ScrollView>
      </Box>
    </FormProvider>
  );
}

export default AnswerMoreQuestions;
