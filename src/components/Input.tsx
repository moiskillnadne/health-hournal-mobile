import {
  useState,
  Children,
  isValidElement,
  cloneElement,
  PropsWithChildren,
  forwardRef,
  MutableRefObject,
  useLayoutEffect,
} from 'react';
import { Box, Input, IInputProps, StyledProps, FormControl } from 'native-base';
import { FieldError } from 'react-hook-form';
import Animated from 'react-native-reanimated';

import { useAnimatedLabel } from '@app/hooks';

import { IconProps } from './icons';
import ErrorMessage from './ErrorMessage';

type Props = {
  value: string | number | undefined;
  error?: string | FieldError;
  LeftElement?: JSX.Element;
  RightElement?: JSX.Element;
} & IInputProps &
  StyledProps;
type InputProps = PropsWithChildren<IconProps>;

function InputIcon({ children, active, error }: InputProps) {
  const childrenWithProps = Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, { active, error });
    }

    return child;
  });

  return <>{childrenWithProps}</>;
}

function prepareValue(value: string | number | undefined): string | undefined {
  return value ? (typeof value === 'string' ? value : value.toString()) : undefined;
}

export default forwardRef(function (
  { label, value: inputValue, isReadOnly = false, error, isDisabled = false, ...props }: Props,
  ref,
) {
  const { LeftElement, RightElement } = props;
  const { onBlur, onFocus } = props;

  const value = prepareValue(inputValue);
  const [isFocused, setIsFocused] = useState(false);

  const { shrinkLabel, expandLabel, labelStyles, animatedLabelValue } = useAnimatedLabel(
    value ? 1 : 0,
  );

  useLayoutEffect(() => {
    if (value && !animatedLabelValue.value) {
      animatedLabelValue.value = 1;
    }
  }, [animatedLabelValue, value]);

  return (
    <FormControl isInvalid={!!error} bgColor="white" rounded={4}>
      <FormControl.Label position="absolute" top={0} left={0}>
        <Animated.Text
          style={[
            labelStyles,
            {
              position: 'absolute',
              color: error ? '#ff0000' : 'black',
              left: LeftElement ? 43 : 16,
              marginTop: -8,
            },
            isDisabled && {
              opacity: 0.5,
            },
          ]}
        >
          {error && isFocused ? <ErrorMessage error={error} /> : label}
        </Animated.Text>
      </FormControl.Label>

      <Input
        isReadOnly={isReadOnly}
        pointerEvents={isReadOnly ? 'none' : 'auto'}
        autoCapitalize="none"
        pt="26px"
        pb={2}
        pl={LeftElement ? 2 : 4}
        bgColor="transparent"
        ref={ref as MutableRefObject<any>}
        value={value}
        onBlur={e => {
          onBlur && onBlur(e);
          setIsFocused(false);

          if (!value) {
            expandLabel();
          }
        }}
        onFocus={e => {
          onFocus && onFocus(e);
          setIsFocused(true);
          shrinkLabel();
        }}
        InputLeftElement={
          LeftElement ? (
            <Box ml={4}>
              <InputIcon active={isFocused} error={!!error}>
                {LeftElement}
              </InputIcon>
            </Box>
          ) : undefined
        }
        InputRightElement={
          RightElement ? (
            <Box mr={4}>
              <InputIcon>{RightElement}</InputIcon>
            </Box>
          ) : undefined
        }
        isDisabled={isDisabled}
        {...props}
      />
    </FormControl>
  );
});
