import type { KeyboardTypeOptions } from 'react-native';

import { FormControl, StyledProps } from 'native-base';
import { FieldError, useController, useFormContext } from 'react-hook-form';

import { FormFieldProps } from '@app/types';

import Input from '../Input';

type Props = {
  LeftElement?: JSX.Element;
  RightElement?: JSX.Element;
  error?: string | FieldError;
  placeholder?: string;
  type?: 'text' | 'password';
  keyboardType?: KeyboardTypeOptions;
  isReadOnly?: boolean;
  maxLength?: number;
} & FormFieldProps<string> &
  StyledProps;

function InputField(props: Props) {
  const {
    defaultValue,
    label,
    name,
    placeholder,
    type = 'text',
    LeftElement,
    RightElement,
    keyboardType,
    maxLength,
    isReadOnly = false,
    onChange,
    ...styleProps
  } = props;
  const { control } = useFormContext();

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
    <FormControl isInvalid={!!error} {...styleProps}>
      <Input
        label={label}
        error={error}
        LeftElement={LeftElement}
        RightElement={RightElement}
        placeholder={placeholder}
        onChangeText={onChangeValue}
        value={value}
        type={type}
        keyboardType={keyboardType}
        isReadOnly={isReadOnly}
        maxLength={maxLength}
        ref={ref}
      />
    </FormControl>
  );
}

export default InputField;
