import { PropsWithChildren, forwardRef, MutableRefObject } from 'react';
import { Row, Checkbox as NativeCheckbox, StyledProps } from 'native-base';

import { CheckBoxIcon } from '@app/components/icons';

const bgGreenStyles = {
  _checked: {
    p: 0,
    borderColor: 'white',
    _pressed: {
      borderColor: 'white',
    },
  },
  _pressed: {
    borderColor: 'white',
  },
};

type Props = PropsWithChildren<{
  name?: string;
  value: string;
  onChange: (value: boolean) => void;
  accessibilityLabel: string;
  orientation?: 'right' | 'left';
  isChecked: boolean;
  bgTheme?: 'green';
}> &
  StyledProps;

export default forwardRef(function Checkbox(
  {
    name,
    value,
    onChange,
    accessibilityLabel,
    children,
    orientation = 'right',
    isChecked,
    borderColor = 'black',
    bgTheme,
    ...styledProps
  }: PropsWithChildren<Props>,
  ref,
) {
  return (
    <Row w={'100%'} justifyContent="space-between">
      {orientation === 'left' && children}
      <NativeCheckbox
        name={name}
        value={value}
        isChecked={isChecked}
        accessibilityLabel={accessibilityLabel}
        onChange={onChange}
        icon={<CheckBoxIcon />}
        ref={ref as MutableRefObject<any>}
        _text={{
          fontSize: '14px',
          mt: 2,
        }}
        size="lg"
        _checked={{
          p: 0,
        }}
        borderColor={borderColor}
        {...(bgTheme === 'green' ? bgGreenStyles : null)}
        {...styledProps}
      >
        {orientation === 'right' && children}
      </NativeCheckbox>
    </Row>
  );
});
