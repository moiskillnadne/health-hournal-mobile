import { PropsWithChildren } from 'react';
import { FormControl, StyledProps } from 'native-base';
import { useController, useFormContext } from 'react-hook-form';

import { FormFieldProps } from '@app/types';

import Checkbox from '../Checkbox';

type Props = {
  error?: string;
  accessibilityLabel: string;
  orientation?: 'right' | 'left';
  bgTheme?: 'green';
} & FormFieldProps<boolean> &
  StyledProps;

function CheckboxField(props: PropsWithChildren<Props>) {
  const { defaultValue, name, accessibilityLabel, orientation, children, onChange, ...styles } =
    props;

  const { control } = useFormContext();

  const {
    field: { onChange: onFormChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  function onChangeValue(value: boolean) {
    if (onChange) {
      onChange(value);
    }
    onFormChange(value);
  }

  return (
    <FormControl>
      <Checkbox
        orientation={orientation}
        onChange={onChangeValue}
        value={value}
        accessibilityLabel={accessibilityLabel}
        isChecked={Boolean(value)}
        ref={ref}
        {...styles}
      >
        {children}
      </Checkbox>
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
}

export default CheckboxField;
