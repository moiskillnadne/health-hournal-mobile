import { FormFieldProps } from '@app/types';
import { FormControl, StyledProps, TextArea } from 'native-base';
import { useFormContext, useController } from 'react-hook-form';

type Props = {
  accessibilityLabel: string;
  textAreaStyles: StyledProps;
  isDisabled?: boolean;
  placeholder?: string;
  maxLength?: number;
} & FormFieldProps<string> &
  StyledProps;

function TextAreaField(props: Props) {
  const {
    defaultValue,
    name,
    accessibilityLabel,
    isDisabled = false,
    textAreaStyles,
    placeholder = '',
    onChange,
    maxLength,
    ...styles
  } = props;

  const { control } = useFormContext();

  const {
    field: { onChange: onFormChange, value },
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
    <FormControl isInvalid={!!error} {...styles}>
      <TextArea
        value={value}
        onChangeText={onChangeValue}
        placeholder={placeholder}
        autoCompleteType="off"
        accessibilityLabel={accessibilityLabel}
        isDisabled={isDisabled}
        maxLength={maxLength}
        {...textAreaStyles}
      />

      <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  );
}

export default TextAreaField;
