import { useEffect, useMemo } from 'react';
import { Text, Button, Column, Row, Switch, Pressable } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { skipToken } from '@reduxjs/toolkit/query';

import { ErrorAlert, AppModal } from '@app/components';
import { DatePickerField, SelectField, InputField } from '@app/components/form';
import {
  useAppForm,
  useAppSelector,
  useCommonTranslate,
  useNotificationPermissionCheck,
} from '@app/hooks';

import {
  useTranslate,
  useAddProcedureMutation,
  useFetchProceduresQuery,
  useFetchProcedureFrequencyQuery,
  useFetchProcedurePeriodsQuery,
  useFetchProcedureEntityQuery,
  useUpdateProcedureMutation,
} from '../../hooks';
import { ProcedureEditorSchema } from '../../schemas';
import { ProcedureEditorForm } from '../../types';
import { selectProcedure } from '../../state';
import { Procedure } from '../../utils';

type Props = {
  id?: string;
  preselectedProcedureId?: string;
  onClose: () => void;
};

function ProcedureEditor({ onClose, id, preselectedProcedureId }: Props) {
  const t = useTranslate();

  const globalT = useCommonTranslate();

  const checkNotificationPermissions = useNotificationPermissionCheck();

  const defaultValues = useAppSelector(selectProcedure);

  const form = useAppForm<ProcedureEditorForm>(
    {
      defaultValues,
    },
    { schema: ProcedureEditorSchema },
  );

  const { handleSubmit, watch, setValue, reset } = form;

  const [procedureId, repeatEnabled] = watch(['procedureId', 'repeatEnabled']);

  const { data: proceduresData } = useFetchProceduresQuery();

  const { procedures } = useFetchProceduresQuery(undefined, {
    selectFromResult: ({ data }) => ({
      procedures: data?.map(item => ({ label: item.name, value: item.id })),
    }),
  });

  const { data: entity } = useFetchProcedureEntityQuery(id ? id : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const { data: frequency } = useFetchProcedureFrequencyQuery();

  const { data: periods } = useFetchProcedurePeriodsQuery();

  const other = useMemo(() => procedures?.find(item => item.label === 'Other'), [procedures]);

  const [addProcedure, { isSuccess: isSuccessfullyAdded, error: errorAdding }] =
    useAddProcedureMutation();

  const [updateProcedure, { isSuccess: isSuccessfullyUpdated, error: errorUpdating }] =
    useUpdateProcedureMutation();

  function submit(data: ProcedureEditorForm) {
    if (entity && id) {
      const payload = Procedure.toUpdateData(data, id);
      updateProcedure(payload);
    } else {
      const payload = Procedure.toAddData(data);
      addProcedure(payload);
    }
  }

  function changeRepeatIn(value: boolean) {
    if (value) {
      checkNotificationPermissions().then(value => {
        value && setValue('repeatEnabled', true);
      });
    } else {
      setValue('repeatEnabled', false);
    }
  }

  function changeProcedure(id: string) {
    const procedure = proceduresData?.find(item => item.id === id);

    setValue('frequency', String(procedure?.interval));
    setValue('period', procedure?.period);
  }

  useEffect(() => {
    if (entity) {
      const procedure = proceduresData?.find(item => item.id === entity.procedureId);

      reset({
        ...entity,
        repeatEnabled: Boolean(entity.interval && entity.period),
        frequency: entity.interval ? String(entity.interval) : String(procedure?.interval),
        period: entity.period || procedure?.period,
        date: entity.datetime,
        time: entity.datetime,
      });
    }
  }, [entity, reset, defaultValues, proceduresData]);

  useEffect(() => {
    if (isSuccessfullyAdded || isSuccessfullyUpdated) {
      onClose();
    }
  }, [isSuccessfullyAdded, isSuccessfullyUpdated, onClose]);

  useEffect(() => {
    if (preselectedProcedureId) {
      setValue('procedureId', preselectedProcedureId);
    }
  }, [preselectedProcedureId, setValue]);

  return (
    <>
      <AppModal isOpen onClose={onClose} px={4} avoidKeyboard>
        <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full" py={1}>
          <AppModal.CloseButton top={3.5} />

          <AppModal.Header borderBottomWidth={0} bgColor="white">
            <Text fontSize={18} fontWeight={600}>
              {entity ? t('titles.edit_procedure') : t('titles.add_procedure')}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column space={2.5} w={'100%'}>
                <SelectField
                  label={t('form.procedures')}
                  name="procedureId"
                  options={procedures}
                  onChange={changeProcedure}
                />

                {procedureId && procedureId === other?.value ? (
                  <InputField label={t('form.procedure_name')} name="name" maxLength={128} />
                ) : null}

                <DatePickerField mode="date" label={globalT('form.date')} name="date" />

                <DatePickerField mode="time" label={globalT('form.time')} name="time" />

                <Row mt={3.5} justifyContent="space-between">
                  <Text>{t('form.repeat_in')}</Text>

                  <Switch isChecked={repeatEnabled} onValueChange={changeRepeatIn} />
                </Row>

                <Row space={2.5}>
                  <SelectField
                    flex={1}
                    label={globalT('quantity')}
                    name="frequency"
                    options={frequency}
                    isDisabled={!repeatEnabled}
                  />

                  <SelectField
                    flex={1}
                    label={globalT('frequency')}
                    name="period"
                    options={periods}
                    isDisabled={!repeatEnabled}
                  />
                </Row>
              </Column>
            </FormProvider>

            <Button mt={3} w="100%" onPress={handleSubmit(submit)}>
              {entity ? t('buttons.save') : t('buttons.add')}
            </Button>

            <Pressable mt={5} w="100%" onPress={onClose} hitSlop={5}>
              <Text textAlign="center" color="primary.500" fontWeight={600}>
                {globalT('cancel')}
              </Text>
            </Pressable>
          </AppModal.Body>
        </AppModal.Content>
      </AppModal>

      {errorAdding && <ErrorAlert error={errorAdding}></ErrorAlert>}

      {errorUpdating && <ErrorAlert error={errorUpdating}></ErrorAlert>}
    </>
  );
}

export default ProcedureEditor;
