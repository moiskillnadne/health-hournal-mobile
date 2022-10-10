import { MutableRefObject } from 'react';
import { Text, Radio, Stack, FormControl } from 'native-base';
import { useFormContext, useController } from 'react-hook-form';

import { LabelValue, FormFieldProps } from '@app/types';

import ErrorMessage from '../ErrorMessage';

type Props = {
  options: (LabelValue & { icon?: JSX.Element })[];
  accessibilityLabel: string;
  direction?: 'row' | 'column';
} & FormFieldProps;

function RadioGroupField({
  name,
  defaultValue,
  options,
  accessibilityLabel,
  direction = 'column',
  onChange,
}: Props) {
  const { control } = useFormContext();

  const isColumnDirection = direction === 'column';

  const {
    field: { onChange: onFormChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  function onChangeValue(value: string) {
    if (onChange) {
      onChange(value);
    }
    onFormChange(value);
  }

  return (
    <FormControl isInvalid={!!error}>
      <Radio.Group
        name={name}
        value={value}
        onChange={onChangeValue}
        accessibilityLabel={accessibilityLabel}
        defaultValue={defaultValue as string}
        ref={ref as unknown as MutableRefObject<any>}
      >
        <Stack
          direction={{
            base: direction,
          }}
          w="100%"
          space={2.5}
        >
          {options.map(option => (
            <Radio key={option.value} value={option.value} size="lg">
              <Text color="white" mr={2} flex={isColumnDirection ? 1 : 0}>
                {option.label}
              </Text>

              {option.icon}
            </Radio>
          ))}
        </Stack>
      </Radio.Group>
      <FormControl.ErrorMessage>
        {error ? <ErrorMessage error={error} /> : null}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

export default RadioGroupField;
