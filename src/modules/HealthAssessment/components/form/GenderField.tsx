import { useState } from 'react';
import { Keyboard } from 'react-native';
import { FormControl, Text, Pressable, Row } from 'native-base';
import { useController, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@app/components';

import { IdName } from '@app/types';

type Props = {
  title: string;
  genders?: IdName[];
  defaultValue?: string;
};

export function GenderField({ title, genders = [], defaultValue }: Props) {
  const [selected, setSelected] = useState(defaultValue || '');

  const { control, setValue } = useFormContext();

  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name: 'genderId',
    control,
  });

  function onPressOption(gender: IdName) {
    setValue('gender', gender.name);
    onChange(gender.id);
    setSelected(gender.name);
    Keyboard.dismiss();
  }

  return (
    <FormControl
      isInvalid={!!error}
      bgColor="white"
      p={3.5}
      borderRadius={4}
      borderColor={error ? '#ff0000' : '#e9e9e9'}
      borderWidth={1}
    >
      <Text fontSize={16} letterSpacing={-0.38} mb={2} color="black">
        {title}*
      </Text>
      <Row bgColor="#f2f2f2" borderRadius={4}>
        {genders.map(gender => (
          <Pressable
            key={gender.id}
            flex={1}
            p={2.5}
            borderRadius={4}
            alignItems="center"
            justifyContent="center"
            onPress={() => onPressOption(gender)}
            bgColor={selected === gender.name ? '#00ac09' : '#f2f2f2'}
          >
            <Text
              color={selected === gender.name ? 'white' : 'black'}
              fontWeight={selected === gender.name ? 'bold' : 'normal'}
            >
              {gender.name}
            </Text>
          </Pressable>
        ))}
      </Row>
      <FormControl.ErrorMessage>
        {error ? <ErrorMessage error={error} /> : null}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

export default GenderField;
