import { useState, useMemo, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { FormControl, Box, Button, Pressable, Text, Actionsheet, StyledProps } from 'native-base';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import { useFormContext, useController } from 'react-hook-form';

import { Input } from '@app/components';
import { useCommonTranslate } from '@app/hooks';
import { formatDate } from '@app/utils';
import { FormFieldProps } from '@app/types';

type Props = Omit<DatePickerProps, 'date'> & FormFieldProps & StyledProps;

function DatePickerField({
  defaultValue,
  label,
  name,
  maximumDate,
  minimumDate,
  onChange,
  mode = 'date',
  ...styleProps
}: Props) {
  const globalT = useCommonTranslate();

  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const [date, setDate] = useState(new Date());

  const { control } = useFormContext();

  const {
    field: { onChange: onFormChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const inputValue = useMemo(() => {
    if (value && typeof value === 'string') {
      const format = {
        date: undefined,
        datetime: 'MMMM d, yyyy h:mm a',
        time: 'h:mm a',
      }[mode];

      return formatDate(value, format);
    }

    return '';
  }, [value, mode]);

  function open() {
    setDatePickerOpened(true);
  }

  function close() {
    setDatePickerOpened(false);
  }

  function next() {
    onChangeValue(date.toUTCString());
    setDatePickerOpened(false);
  }

  function onChangeValue(value: string) {
    if (onChange) {
      onChange(value);
    }
    onFormChange(value);
  }

  useEffect(() => {
    if (datePickerOpened) {
      Keyboard.dismiss();
    }
  }, [datePickerOpened]);

  return (
    <FormControl isInvalid={!!error} {...styleProps}>
      <Pressable onPress={open}>
        <Input label={label} name={name} value={inputValue} isReadOnly error={error} ref={ref} />
      </Pressable>

      <Actionsheet isOpen={datePickerOpened} onClose={close}>
        <Actionsheet.Content bgColor="white">
          <Box w="100%" h={50} px={4} justifyContent="center">
            <Text fontSize="16px" color="black" textAlign="center" fontWeight={600}>
              {label}
            </Text>
          </Box>
          <DatePicker
            date={date}
            onDateChange={setDate}
            androidVariant="iosClone"
            mode={mode}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          />
          <Button mt={3} w="100%" onPress={next}>
            {globalT('next')}
          </Button>
        </Actionsheet.Content>
      </Actionsheet>
    </FormControl>
  );
}

export default DatePickerField;
