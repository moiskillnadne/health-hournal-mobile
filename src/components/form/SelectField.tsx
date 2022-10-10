import { PropsWithChildren, useEffect, MutableRefObject, useRef, useImperativeHandle } from 'react';
import { TextInput } from 'react-native';
import { FormControl, Select, StyledProps } from 'native-base';
import { useFormContext, useController } from 'react-hook-form';
import Animated from 'react-native-reanimated';

import { useAnimatedLabel } from '@app/hooks';
import { FormFieldProps, LabelValue } from '@app/types';

import ErrorMessage from '../ErrorMessage';

type Props = {
  options?: LabelValue[];
} & FormFieldProps<string> &
  StyledProps;

function SelectField(props: PropsWithChildren<Props>) {
  const {
    defaultValue,
    label,
    name,
    options = [],
    onChange,
    isDisabled = false,
    ...styleProps
  } = props;

  const inputRef = useRef<TextInput>();

  const { control } = useFormContext();

  const {
    field: { value, onChange: onFormChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const { labelStyles, shrinkLabel, expandLabel, animatedLabelValue } = useAnimatedLabel();

  function onChangeValue(value: string) {
    if (onChange) {
      onChange(value);
    }
    onFormChange(value);
  }

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current?.focus();
    },
  }));

  useEffect(() => {
    if (value && !animatedLabelValue.value) {
      setImmediate(() => {
        animatedLabelValue.value = 1;
      });
    }
  }, [animatedLabelValue, value]);

  return (
    <FormControl isInvalid={!!error} {...styleProps} bgColor="white" rounded={4}>
      <FormControl.Label position="absolute" top={0} left={0}>
        <Animated.Text
          style={[
            labelStyles,
            {
              position: 'absolute',
              color: error ? '#ff0000' : 'black',
              left: 16,
              marginTop: -10,
            },
            isDisabled && {
              opacity: 0.5,
            },
          ]}
        >
          {error ? <ErrorMessage error={error} /> : label}
        </Animated.Text>
      </FormControl.Label>

      <Select
        accessibilityLabel={label}
        selectedValue={value}
        onValueChange={onChangeValue}
        onOpen={shrinkLabel}
        onClose={() => !value && expandLabel()}
        bgColor="transparent"
        fontSize="md"
        pt={6}
        pb={2}
        pl={4}
        isDisabled={isDisabled}
        ref={ref as unknown as MutableRefObject<any>}
      >
        {options.map(option => (
          <Select.Item key={option.label} {...option} />
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectField;
