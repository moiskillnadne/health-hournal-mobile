import type { KeyboardTypeOptions } from 'react-native';

import { FormControl, StyledProps } from 'native-base';
import { FieldError, useController, useFormContext } from 'react-hook-form';
import {
  TextInputMask,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';

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
  maskType?: TextInputMaskTypeProp;
  options: TextInputMaskOptionProp;
  maxLength?: number;
} & FormFieldProps<string> &
  StyledProps;

function InputMaskField(props: Props) {
  const {
    defaultValue,
    label,
    name,
    placeholder,
    type = 'text',
    LeftElement,
    RightElement,
    keyboardType,
    isReadOnly = false,
    onChange,
    maskType = 'custom',
    options,
    maxLength,
    isDisabled = false,
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
      <TextInputMask
        type={maskType}
        options={options}
        value={value}
        onChangeText={onChangeValue}
        customTextInput={Input}
        customTextInputProps={{
          label,
          error,
          LeftElement,
          RightElement,
          placeholder,
          value,
          type,
          keyboardType,
          isReadOnly,
          maxLength,
          isDisabled,
        }}
        refInput={ref}
      />
    </FormControl>
  );
}

export default InputMaskField;
