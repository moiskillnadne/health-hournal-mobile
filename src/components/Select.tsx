import { Box, Select as NBSelect, StyledProps } from 'native-base';

import { KeyValue } from '@app/types';

import { DropdownArrowIcon } from './icons';

type Props = {
  value: string;
  placeholder?: string;
  options: KeyValue[];
  onChange: (value: string) => unknown;
} & StyledProps;

function Select(props: Props) {
  return (
    <NBSelect
      p={1}
      w="full"
      bgColor="white"
      accessibilityLabel={props.placeholder}
      placeholder={props.placeholder}
      selectedValue={props.value}
      onValueChange={props.onChange}
      dropdownOpenIcon={
        <Box mr={3} style={{ transform: [{ rotate: '180deg' }] }}>
          <DropdownArrowIcon />
        </Box>
      }
      dropdownCloseIcon={
        <Box mr={3}>
          <DropdownArrowIcon />
        </Box>
      }
      {...props}
    >
      {props.options.map(option => (
        <NBSelect.Item key={option.key} label={option.key} value={option.value} />
      ))}
    </NBSelect>
  );
}

export default Select;
