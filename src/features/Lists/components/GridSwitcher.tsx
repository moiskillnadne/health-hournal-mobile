import { Pressable, Row, Center, IBoxProps } from 'native-base';

import { ListViewType } from '../types';

import { GridViewIcon, ListViewIcon } from './icons';

type Props = {
  value: ListViewType;
  onChange: (value: ListViewType) => unknown;
} & IBoxProps;

type ButtonProps = {
  renderIcon: (color: string) => JSX.Element;
  isActive: boolean;
};

function Button({ isActive, renderIcon }: ButtonProps) {
  const color = isActive ? 'white' : '#DEE0E6';

  return (
    <Center borderRadius={4} padding={2} bgColor={isActive ? 'secondary.500' : 'white'}>
      {renderIcon(color)}
    </Center>
  );
}

function GridSwitcher({ value, onChange, ...props }: Props) {
  function chooseGrid() {
    onChange('grid');
  }

  function chooseList() {
    onChange('list');
  }

  return (
    <Row
      borderRadius={4}
      borderWidth={2}
      borderColor="white"
      bgColor="white"
      justifyContent="space-between"
      {...props}
    >
      <Pressable onPress={chooseGrid} flexGrow={1} flexShrink={0} flexBasis="auto">
        <Button isActive={value === 'grid'} renderIcon={color => <GridViewIcon color={color} />} />
      </Pressable>

      <Pressable onPress={chooseList} flexGrow={1} flexShrink={0} flexBasis="auto">
        <Button isActive={value === 'list'} renderIcon={color => <ListViewIcon color={color} />} />
      </Pressable>
    </Row>
  );
}

export default GridSwitcher;
