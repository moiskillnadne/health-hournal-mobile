import { useEffect, useMemo } from 'react';
import { Box, Row, Column, Button, Pressable, ScrollView } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { Header, Content, H1, Progress, Input, ErrorAlert, Logo } from '@app/components';
import { InputField, SelectField, DatePickerField, InputMaskField } from '@app/components/form';
import {
  useAppForm,
  useAppSelector,
  useAppDispatch,
  useStepper,
  useCommonTranslate,
  useFetchGendersQuery,
  useFetchRacesQuery,
  useSelectOptions,
  useExitAppOnBackButton,
} from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { MEASUREMENT_UNITS, MASS_UNITS } from '@app/constants';
import { getBMI, dismissKeyboard } from '@app/utils';
import { HintIcon } from '@app/components/icons';
import { userChanged } from '@app/state';

import { useSavePersonalInfoMutation, useTranslate, usePersistOnChange } from '../../hooks';
import { SavePersonalInfoRequest, selectPersonalInformation } from '../../state';
import { PersonalInformationSchema } from '../../schemas';
import { PersonalInformationForm } from '../../types';
import { GenderField } from './GenderField';
import { SettingsIcon } from '../icons';

function PersonalInformation() {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isConnected = useIsConnected();

  const unit = useAppSelector(selectMeasurementUnit);
  const personalInformation = useAppSelector(selectPersonalInformation);

  const massUnit = MASS_UNITS[unit];

  const { progress, onNext } = useStepper();

  const form = useAppForm<PersonalInformationForm>(
    {
      defaultValues: personalInformation as PersonalInformationForm,
    },
    { schema: PersonalInformationSchema, context: { unit, format: 'XXX.X' } },
  );

  const { handleSubmit, getValues, watch } = form;

  const { data: genders } = useFetchGendersQuery();

  const { data: races } = useFetchRacesQuery();

  const [
    savePersonalInfo,
    { isLoading: isSavingPersonalInfo, isSuccess: successfullySaved, error },
  ] = useSavePersonalInfoMutation();

  const raceOptions = useSelectOptions(races);

  const units = watch(['weight', 'height']);

  const bmi = useMemo(() => getBMI(...units, unit), [units, unit]);

  function onSubmit() {
    const {
      firstName,
      lastName,
      companyCode,
      dateOfBirth,
      genderId,
      raceId,
      city,
      state,
      country,
      weight,
      height,
      goalWeight,
    } = getValues();

    const payload = {
      firstName,
      ...(lastName && { lastName }),
      ...(companyCode && { companyCode }),
      dateOfBirth,
      genderId,
      raceId,
      city,
      state,
      country,
      weight,
      goalWeight,
      height,
    } as SavePersonalInfoRequest;
    savePersonalInfo(payload);
  }

  function navigateUnits() {
    navigate('/private/settings/localization');
  }

  useEffect(() => {
    if (successfullySaved) {
      const user = getValues();

      onNext(getValues());
      dispatch(userChanged(user));
    }
  }, [successfullySaved, onNext, getValues, dispatch]);

  useExitAppOnBackButton();

  usePersistOnChange(watch);

  return (
    <Box flex={1}>
      <Header
        title={t('titles.health_assessment')}
        rightElement={
          <Pressable onPress={navigateUnits}>
            <SettingsIcon />
          </Pressable>
        }
      />

      <Progress value={progress} />

      <FormProvider {...form}>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Content my={5}>
            <H1 mb={5}>{t('titles.personal_information')}</H1>

            <Column mb={4} space="2.5">
              <InputField
                label={`${globalT('user.first_name')}*`}
                name="firstName"
                maxLength={128}
              />

              <InputField label={`${globalT('user.last_name')}`} name="lastName" maxLength={128} />

              <InputField
                label={`${globalT('user.company_code')}`}
                name="companyCode"
                maxLength={128}
                RightElement={<HintIcon>{globalT('tooltip.company_code')}</HintIcon>}
              />

              <DatePickerField
                label={`${globalT('user.birth_date')}*`}
                name="dateOfBirth"
                maximumDate={new Date()}
              />

              <InputField label={`${globalT('user.country')}*`} name="country" maxLength={128} />

              <InputField label={`${globalT('user.state')}*`} name="state" maxLength={128} />

              <InputField label={`${globalT('user.city')}*`} name="city" maxLength={128} />

              <InputField
                label={`${globalT('user.weight')}, ${massUnit}*`}
                name={`weight.${massUnit}`}
                keyboardType="numeric"
                maxLength={5}
              />

              <InputField
                label={`${globalT('user.goal_weight')}, ${massUnit}`}
                keyboardType="numeric"
                name={`goalWeight.${massUnit}`}
                maxLength={5}
              />

              {unit == MEASUREMENT_UNITS.METRIC ? (
                <InputMaskField
                  label={`${globalT('user.height')}, cm*`}
                  keyboardType="numeric"
                  name="height.cm"
                  maxLength={3}
                  options={{
                    mask: '999',
                  }}
                />
              ) : (
                <Row space={2.5}>
                  <InputMaskField
                    flex={1}
                    label={`${globalT('user.height')}, ft*`}
                    keyboardType="numeric"
                    name="height.ft"
                    maxLength={1}
                    options={{
                      mask: '9',
                    }}
                  />

                  <InputMaskField
                    flex={1}
                    label={`${globalT('user.height')}, in*`}
                    keyboardType="numeric"
                    name="height.in"
                    maxLength={2}
                    options={{
                      mask: '99',
                    }}
                  />
                </Row>
              )}

              <Input
                label={`${globalT('user.BMI')}, ${massUnit}`}
                type={'text'}
                value={bmi}
                RightElement={<HintIcon placement="top">{t('tooltip.bmi')}</HintIcon>}
                isReadOnly={true}
              />

              <GenderField
                title={globalT('user.birth_gender')}
                genders={genders}
                defaultValue={getValues('gender')}
              />

              <SelectField label={`${globalT('user.race')}*`} name="raceId" options={raceOptions} />
            </Column>

            <Button
              onPress={dismissKeyboard(handleSubmit(onSubmit))}
              isLoading={isSavingPersonalInfo}
              isDisabled={!isConnected}
            >
              {globalT('next')}
            </Button>
          </Content>

          <Logo />
        </ScrollView>
      </FormProvider>

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </Box>
  );
}

export default PersonalInformation;
