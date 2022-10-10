import { PropsWithChildren } from 'react';
import { Box, StyledProps } from 'native-base';

type Props = PropsWithChildren<{
  value: number;
}> &
  StyledProps;

function Progress({ value, children, ...styledProps }: Props) {
  const min = 0;
  const max = 100;

  const valueWidth = value < max && value > min ? value : value > min ? 100 : 0;

  return (
    <Box
      overflow="hidden"
      w="full"
      height={2}
      accessible
      accessibilityRole="progressbar"
      bgColor="white"
      accessibilityValue={{
        min: min,
        max: max,
        now: valueWidth,
      }}
      {...styledProps}
    >
      <Box
        w={`${valueWidth}%`}
        h="full"
        alignItems="center"
        justifyContent="center"
        bgColor="#00ac09"
      >
        {children}
      </Box>
    </Box>
  );
}

export default Progress;
