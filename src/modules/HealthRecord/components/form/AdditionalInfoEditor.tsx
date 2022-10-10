import { useState, useEffect } from 'react';
import { Text, Column, Button } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useIsConnected } from 'react-native-offline';

import { AppModal } from '@app/components';
import { TextAreaField } from '@app/components/form';
import { useAppForm, useAppSelector } from '@app/hooks';

import { useTranslate, useUpdateAdditionInfoMutation } from '../../hooks';
import { AdditionalInfoEditorSchema } from '../../schemas';
import { AdditionalInfoEditorForm } from '../../types';
import { selectAdditionalInfo } from '../../state';

type Props = {
  onClose: () => void;
};

function AdditionalInfoEditor({ onClose }: Props) {
  const t = useTranslate();

  const defaultValues = useAppSelector(selectAdditionalInfo);

  const isOnline = useIsConnected();

  const form = useAppForm<AdditionalInfoEditorForm>(
    {
      defaultValues,
    },
    { schema: AdditionalInfoEditorSchema },
  );

  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const [updateInfo, { isSuccess: isSuccessfullyUpdated, isError, isLoading }] =
    useUpdateAdditionInfoMutation();

  function onSave(data: AdditionalInfoEditorForm) {
    updateInfo({ value: data.value ?? '' });
  }

  useEffect(() => {
    if (!isOnline && isError) {
      onClose();
    }
  }, [isOnline, isError, onClose]);

  useEffect(() => {
    if (isSuccessfullyUpdated) {
      onClose();
    }
  }, [isSuccessfullyUpdated, onClose]);

  return (
    <>
      <AppModal isOpen onClose={onClose} px={4} avoidKeyboard>
        <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full">
          <AppModal.CloseButton top={3.5} />

          <AppModal.Header borderBottomWidth={0} bgColor="white" mr={3}>
            <Text fontSize={18} fontWeight={600}>
              {defaultValues.value ? t('titles.edit_addition_info') : t('titles.add_addition_info')}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column mb={5}>
                <TextAreaField
                  name={'value'}
                  accessibilityLabel={t('form.other_condition')}
                  textAreaStyles={{
                    minH: 100,
                  }}
                  maxLength={5000}
                />
              </Column>

              <Button mt={5} onPress={handleSubmit(onSave)} isDisabled={!isDirty || isLoading}>
                {defaultValues.value ? t('buttons.save') : t('buttons.add')}
              </Button>
            </FormProvider>
          </AppModal.Body>
        </AppModal.Content>
      </AppModal>
    </>
  );
}

export default AdditionalInfoEditor;
