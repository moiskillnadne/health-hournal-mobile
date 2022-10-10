import { StyledProps, Switch } from 'native-base';
import { useFormContext, useController } from 'react-hook-form';

import { FormFieldProps } from '@app/types';

type Props = FormFieldProps<boolean> & StyledProps;

function SwitchField({ name, defaultValue, onChange, ...props }: Props) {
  const { control } = useFormContext();

  const {
    field: { onChange: onFormChange, value },
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

  return <Switch isChecked={value} onValueChange={onChangeValue} {...props} />;
}

export default SwitchField;
