import { useEffect } from 'react';
import { Row, Text } from 'native-base';
import { useFormContext, useWatch } from 'react-hook-form';

import { SelectField, SwitchField } from '@app/components/form';
import {
  useCommonTranslate,
  useFetchProcedurePeriodsQuery,
  useFetchFrequencyQuery,
} from '@app/hooks';
import { Procedure } from '@app/types';

import { useTranslate } from '../../hooks';

type Props = {
  name: string;
  procedure?: Procedure;
};

function RepeatIn({ name, procedure }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const { control, setValue, clearErrors } = useFormContext();
  const repeatEnabled = useWatch({
    control,
    name: `${name}.repeatEnabled`,
  });

  const { data: periods } = useFetchProcedurePeriodsQuery();
  const { data: frequency } = useFetchFrequencyQuery();

  function clearErrorOnDate(value: boolean) {
    !value && clearErrors(`${name}.datetime`);
  }

  useEffect(() => {
    if (!procedure) return;

    setValue(`${name}.frequency`, procedure.interval.toString());
    setValue(`${name}.period`, procedure.period);
  }, [name, procedure, setValue]);

  return (
    <>
      <Row justifyContent="space-between" alignItems="flex-end">
        <Text fontWeight="medium" color="white">
          {t('form.repeat_in')}
        </Text>

        <SwitchField
          borderColor="white"
          borderWidth={1}
          name={`${name}.repeatEnabled`}
          onChange={clearErrorOnDate}
        />
      </Row>

      <Row space={2.5} mt="4">
        <SelectField
          flex={1}
          label={globalT('quantity')}
          name={`${name}.frequency`}
          options={frequency}
          isDisabled={!repeatEnabled}
        />

        <SelectField
          flex={1}
          label={globalT('frequency')}
          name={`${name}.period`}
          options={periods}
          isDisabled={!repeatEnabled}
        />
      </Row>
    </>
  );
}

export default RepeatIn;
