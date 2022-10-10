import { useEffect } from 'react';
import { Text, Row, Column, Button } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { AppModal } from '@app/components';
import {
  SelectField,
  InputMaskField,
  MedicationAutocompleteField,
  CheckboxField,
} from '@app/components/form';
import { HintIcon } from '@app/components/icons';
import {
  useAppForm,
  useAppSelector,
  useFetchDoseQuery,
  useFetchFrequencyQuery,
  useFetchPeriodsQuery,
  useCommonTranslate,
} from '@app/hooks';
import { showConfirmCancellationWarning } from '@app/utils';
import { LabelValue } from '@app/types';

import {
  useTranslate,
  useRemoveMedicationMutation,
  useAddMedicationMutation,
  useUpdateMedicationMutation,
} from '../../hooks';
import { MedicationEditorSchema } from '../../schemas';
import { MedicationEditorForm, Medication as TMedication } from '../../types';
import { selectMedication } from '../../state';
import { Medications } from '../../utils';

type Props = {
  medication: Maybe<TMedication>;
  onClose: () => void;
  currencies?: LabelValue[];
};

function MedicationEditor({ medication, onClose, currencies }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const { data: frequencies } = useFetchFrequencyQuery();

  const { data: periods } = useFetchPeriodsQuery();

  const defaultValues = useAppSelector(selectMedication);

  const form = useAppForm<MedicationEditorForm>(
    {
      defaultValues: medication || defaultValues,
    },
    { schema: MedicationEditorSchema },
  );

  const { watch, handleSubmit, getValues, setValue } = form;

  const [name = '', needMedicationAgain] = watch(['name', 'needMedicationAgain']);

  const { data: doses } = useFetchDoseQuery(encodeURI(name));

  const [removeMedication, { isSuccess: isSuccessfullyRemoved }] = useRemoveMedicationMutation();

  const [addMedication, { isSuccess: isSuccessfullyAdded }] = useAddMedicationMutation();

  const [updateMedication, { isSuccess: isSuccessfullyUpdated }] = useUpdateMedicationMutation();

  const isInactive = medication?.status === 'inactive';

  const isDisabled = isInactive && !needMedicationAgain;

  function onAdd() {
    const data = getValues();
    const payload = Medications.toAddData(data);
    addMedication(payload);
  }

  function onDelete() {
    if (medication?.id) {
      removeMedication(medication.id);
    }
  }

  function onEdit() {
    if (medication?.id) {
      const data = getValues();
      const payload = Medications.toUpdateData(data, 'active');

      updateMedication(payload);
    }
  }

  function showWarning() {
    showConfirmCancellationWarning({
      message: t('warnings.changes_lost'),
      onConfirm: () => onClose(),
      onDecline: () => {},
    });
  }

  function onSuspend() {
    if (medication?.id) {
      const data = getValues();
      const payload = Medications.toUpdateData(data, 'inactive');
      updateMedication(payload);
    }
  }

  useEffect(() => {
    if (medication?.name !== name) {
      setValue('medicationProductId', '');
    }
  }, [medication?.name, name, setValue]);

  useEffect(() => {
    if (isSuccessfullyRemoved || isSuccessfullyAdded || isSuccessfullyUpdated) {
      onClose();
    }
  }, [isSuccessfullyRemoved, isSuccessfullyAdded, isSuccessfullyUpdated, onClose]);

  return (
    <AppModal isOpen onClose={showWarning} px={4} avoidKeyboard>
      <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full">
        <AppModal.CloseButton top={3.5} />

        <AppModal.Header borderBottomWidth={0} bgColor="white">
          <Text fontSize={18} fontWeight={600}>
            {medication ? t('titles.edit_medication') : t('titles.add_medication')}
          </Text>
        </AppModal.Header>

        <AppModal.Body>
          <FormProvider {...form}>
            <Column space={2.5}>
              {isInactive ? (
                <CheckboxField
                  accessibilityLabel={t('form.i_taking_this_medication_again')}
                  name="needMedicationAgain"
                  defaultValue={false}
                  mb={2}
                >
                  <Text color="black">{t('form.i_taking_this_medication_again')}</Text>
                </CheckboxField>
              ) : null}

              <MedicationAutocompleteField
                label={t('questions.what_medications_do_you_take')}
                name="name"
                isDisabled={isDisabled}
              />

              <SelectField
                label={t('form.dose')}
                name="medicationProductId"
                options={doses}
                isDisabled={isDisabled}
              />

              <Row alignItems="center">
                <Text fontWeight={600} mr={1}>
                  {globalT('frequency')}
                </Text>

                <HintIcon>{globalT('tooltip.frequency')}</HintIcon>
              </Row>

              <Row space={2.5}>
                <SelectField
                  flex={1}
                  label={globalT('quantity')}
                  name="frequency"
                  options={frequencies}
                  isDisabled={isDisabled}
                />

                <SelectField
                  flex={1}
                  label={globalT('frequency')}
                  name="period"
                  options={periods}
                  isDisabled={isDisabled}
                />
              </Row>

              <Row alignItems="center">
                <Text fontWeight={600} mr={1}>
                  {t('form.monthly_cost')}
                </Text>

                <HintIcon>{globalT('tooltip.monthly_cost')}</HintIcon>
              </Row>

              <Row space={2.5}>
                <InputMaskField
                  flex={1}
                  label={t('form.amount')}
                  name="amount"
                  maskType="money"
                  options={{
                    precision: 0,
                    separator: '',
                    delimiter: ',',
                    unit: '',
                  }}
                  keyboardType="numeric"
                  maxLength={6}
                  isDisabled={isDisabled}
                />

                <SelectField
                  flex={1}
                  label={t('form.currency')}
                  name="currency"
                  options={currencies}
                  isDisabled={isDisabled}
                />
              </Row>
            </Column>

            {medication ? (
              <>
                {!isInactive && (
                  <>
                    <Button mt={2.5} onPress={onSuspend}>
                      {t('buttons.i_do_not_take_this_medication_anymore')}
                    </Button>

                    <Button mt={2.5} onPress={onDelete}>
                      {t('buttons.delete')}
                    </Button>
                  </>
                )}

                <Button mt={2.5} onPress={handleSubmit(onEdit)} isDisabled={isDisabled}>
                  {t('buttons.save')}
                </Button>
              </>
            ) : (
              <Button mt={2.5} onPress={handleSubmit(onAdd)}>
                {t('buttons.add')}
              </Button>
            )}
          </FormProvider>
        </AppModal.Body>
      </AppModal.Content>
    </AppModal>
  );
}

export default MedicationEditor;
