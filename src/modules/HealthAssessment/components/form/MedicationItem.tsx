import { useState } from 'react';
import { Box, Text, Row, Column, Button, Pressable } from 'native-base';
import { useController } from 'react-hook-form';

import { SelectField, InputMaskField, MedicationAutocompleteField } from '@app/components/form';
import { DropdownArrowIcon, HintIcon, DeleteIcon, CollapseIcon } from '@app/components/icons';
import { LabelValue } from '@app/types';
import { useFetchDoseQuery, useCommonTranslate } from '@app/hooks';

import { useTranslate } from '../../hooks';
import { AnswerMoreQuestionsForm } from '../../types';

type Props = {
  name: string;
  removeItem: () => void;
  addItem: () => void;
  isFirst: boolean;
  isLast: boolean;
  frequencies?: LabelValue[];
  periods?: LabelValue[];
  currencies?: LabelValue[];
};

function MedicationItem({
  name,
  removeItem,
  addItem,
  isFirst,
  isLast,
  frequencies,
  periods,
  currencies,
}: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const [open, setOpen] = useState(true);

  const {
    field: { value: nameValue },
  } = useController<AnswerMoreQuestionsForm>({ name: `${name}.name` as 'medications.0.name' });

  const { data: doses } = useFetchDoseQuery(encodeURI(nameValue as string));

  function add() {
    addItem();
    setOpen(false);
  }

  function remove() {
    removeItem();
    setOpen(true);
  }

  function toggleOpen() {
    setOpen(open => !open);
  }

  return (
    <>
      <Box bgColor="white" borderRadius={4} borderWidth={1} borderColor="#e9e9e9" p={4}>
        <Column space={2.5}>
          <Row justifyContent="space-between">
            <Text fontWeight={600} mr={2.5} maxWidth="65%" numberOfLines={1}>
              {nameValue || t('form.medication')}
            </Text>

            <Row space={2.5}>
              {(!isFirst || (isFirst && !isLast)) && (
                <Pressable flexDirection="row" onPress={remove} alignItems="center">
                  <Text fontSize={14} fontWeight={600} color="primary.500" mr={1}>
                    {t('buttons.delete')}
                  </Text>

                  <DeleteIcon />
                </Pressable>
              )}

              <Pressable onPress={toggleOpen}>
                {open ? <CollapseIcon /> : <DropdownArrowIcon />}
              </Pressable>
            </Row>
          </Row>

          {open && (
            <Column space={2.5}>
              <MedicationAutocompleteField
                label={t('questions.what_medications_do_you_take')}
                name={`${name}.name`}
              />

              <SelectField label={t('form.dose')} name={`${name}.id`} options={doses} />

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
                  name={`${name}.frequency`}
                  options={frequencies}
                />

                <SelectField
                  flex={1}
                  label={globalT('frequency')}
                  name={`${name}.period`}
                  options={periods}
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
                  name={`${name}.amount`}
                  maskType="money"
                  keyboardType="numeric"
                  options={{
                    precision: 0,
                    separator: '',
                    delimiter: ',',
                    unit: '',
                  }}
                  maxLength={6}
                />

                <SelectField
                  flex={1}
                  label={t('form.currency')}
                  name={`${name}.currency`}
                  options={currencies}
                />
              </Row>
            </Column>
          )}
        </Column>
      </Box>

      {isLast && (
        <Button mt={2.5} onPress={add}>
          {t('buttons.add')}
        </Button>
      )}
    </>
  );
}

export default MedicationItem;
