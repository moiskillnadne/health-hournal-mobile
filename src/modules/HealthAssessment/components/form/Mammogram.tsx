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
import { MammogramSchema } from '../../schemas';
import { MammogramForm } from '../../types';
import { SettingsIcon } from '../icons';
import { selectMammogram } from '../../state';

import RepeatIn from './RepeatIn';

function Mammogram() {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const { progress, onFinish } = useStepper();

  const navigate = useNavigate();

  const checkNotificationPermissions = useNotificationPermissionCheck();

  const defaultValues = useAppSelector(selectMammogram);

  const { data: procedures } = useFetchProceduresQuery();

  const mammogramProcedure = procedures?.find(procedure => procedure.tag === 'mammogram');

  const form = useAppForm<MammogramForm>(
    {
      defaultValues,
    },
    { schema: MammogramSchema },
  );

  const { handleSubmit, getValues, setValue, watch } = form;

  function onSubmit() {
    onFinish(getValues());
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
    const dateTime = 'mammogram.datetime';
    const repeatIn = 'mammogram.repeatEnabled';
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
            <H1>{t('titles.ok_last_but_not_least')}</H1>

            <Column mb={4} mt={2} space="2.5">
              <H1 mr={2}>{t('questions.when_was_your_last_mammogram')}</H1>

              <Box my={4}>
                <Row mt={2.5} alignItems="center">
                  <H1 mr={2}>{t('form.select_date_and_recurrence')}</H1>
                  <HintIcon>{t('tooltip.select_date_and_recurrence')}</HintIcon>
                </Row>

                <DatePickerField
                  label={globalT('date')}
                  name="mammogram.datetime"
                  flex={1}
                  mb={3}
                  mt={2}
                  maximumDate={new Date()}
                  onChange={enableRepeatIn}
                />

                <RepeatIn name="mammogram" procedure={mammogramProcedure} />
              </Box>

              <Column space={3}>
                <RadioGroupField
                  name="noNeedMammogram"
                  accessibilityLabel={t('form.i_do_not_need_mammogram_anymore')}
                  options={[{ label: t('form.i_do_not_need_mammogram_anymore'), value: 'true' }]}
                  onChange={() => {
                    setValue('noMammogram', 'false');
                  }}
                />

                <RadioGroupField
                  name="noMammogram"
                  accessibilityLabel={t('form.i_have_never_had_this_test_done')}
                  options={[{ label: t('form.i_have_never_had_this_test_done'), value: 'true' }]}
                  onChange={() => {
                    setValue('noNeedMammogram', 'false');
                  }}
                />

                <CheckboxField
                  name="remindMammogramInThreeMonth"
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

            <Button mt={5} onPress={handleSubmit(onSubmit)}>
              {t('buttons.finish')}
            </Button>
          </Content>

          <Logo />
        </ScrollView>
      </Box>
    </FormProvider>
  );
}

export default Mammogram;
