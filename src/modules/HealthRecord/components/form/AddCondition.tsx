import { useEffect, useMemo } from 'react';
import { Text, Button, Column, Box } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { ErrorAlert, AppModal } from '@app/components';
import { SelectField, TextAreaField } from '@app/components/form';
import { useAppForm, useFetchConditionsQuery } from '@app/hooks';
import { CONDITION_NAMES } from '@app/constants';

import {
  useTranslate,
  useAddConditionMutation,
  useFetchUserCurrentConditionsQuery,
} from '../../hooks';
import { AddConditionSchema } from '../../schemas';
import { AddConditionForm } from '../../types';

type Props = {
  onClose: () => void;
};

function AddCondition({ onClose }: Props) {
  const t = useTranslate();

  const { data: conditionsData } = useFetchConditionsQuery();

  const { data: currentConditions } = useFetchUserCurrentConditionsQuery();

  const conditionsOptions = useMemo(() => {
    const uniqConditions = conditionsData
      ?.filter(item => item.name !== CONDITION_NAMES.NONE_OF_ABOVE)
      .filter(
        condition =>
          !currentConditions?.some(currentCondition => condition.name === currentCondition.name) ||
          condition.name === CONDITION_NAMES.OTHER,
      );

    return uniqConditions?.map(item => ({ label: item.name, value: item.id }));
  }, [conditionsData, currentConditions]);

  const other = useMemo(
    () => conditionsData?.find(item => item.name === CONDITION_NAMES.OTHER),
    [conditionsData],
  );

  const form = useAppForm<AddConditionForm>({}, { schema: AddConditionSchema });

  const { handleSubmit, getValues, watch } = form;

  const [id, info] = watch(['id', 'info']);

  const [addCondition, { isSuccess: isSuccessfullyAdded, error }] = useAddConditionMutation();

  function onAdd() {
    const payload = [getValues()];
    addCondition(payload);
  }

  useEffect(() => {
    if (isSuccessfullyAdded) {
      onClose();
    }
  }, [isSuccessfullyAdded, onClose]);

  return (
    <>
      <AppModal isOpen onClose={onClose} px={4} avoidKeyboard>
        <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full">
          <AppModal.CloseButton top={3.5} />

          <AppModal.Header borderBottomWidth={0} bgColor="white">
            <Text fontSize={18} fontWeight={600}>
              {t('titles.add_condition')}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column space={2.5}>
                <SelectField label={t('form.condition')} name="id" options={conditionsOptions} />

                {id && id === other?.id ? (
                  <Box mb={6}>
                    <TextAreaField
                      name={'info'}
                      accessibilityLabel={t('form.other_condition')}
                      textAreaStyles={{
                        mt: 1,
                        minH: 100,
                      }}
                      maxLength={128}
                    />
                  </Box>
                ) : null}
              </Column>

              <Button mt={2.5} onPress={handleSubmit(onAdd)} isDisabled={other?.id === id && !info}>
                {t('buttons.add')}
              </Button>
            </FormProvider>
          </AppModal.Body>
        </AppModal.Content>
      </AppModal>
      {error && <ErrorAlert error={error}></ErrorAlert>}
    </>
  );
}

export default AddCondition;
