import { FormFieldProps } from '@app/types';
import { FormControl, StyledProps, Slider, Text } from 'native-base';
import { useFormContext, useController } from 'react-hook-form';

type Props = {
  minValue: number;
  maxValue: number;
} & FormFieldProps &
  StyledProps;

function SliderField(props: Props) {
  const { defaultValue, name, onChange, minValue, maxValue, ...styles } = props;

  const { control } = useFormContext();

  const {
    field: { onChange: onFormChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  function onChangeValue(value: number) {
    if (onChange) {
      onChange(value);
    }
    onFormChange(value);
  }

  return (
    <FormControl isInvalid={!!error} {...styles}>
      <Text color="white" fontWeight={600} textAlign="center">
        {value}
      </Text>
      <Slider
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
        onChange={onChangeValue}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>

      <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  );
}

export default SliderField;
