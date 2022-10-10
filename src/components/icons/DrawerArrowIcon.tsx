import Svg, { Path, SvgProps } from 'react-native-svg';
import { Box } from 'native-base';

type Props = {
  type?: 'up' | 'down';
} & SvgProps;

const DrawerArrowIcon = ({ type = 'up', ...props }: Props) => {
  return (
    <Box style={{ transform: [{ rotateX: type === 'down' ? '180deg' : '0deg' }] }}>
      <Svg width={24} height={24} {...props}>
        <Path
          d="M15.88 15.29 12 11.41l-3.88 3.88a.996.996 0 1 1-1.41-1.41l4.59-4.59a.996.996 0 0 1 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41-.39.38-1.03.39-1.42 0z"
          fill="#FFF"
        />
      </Svg>
    </Box>
  );
};

export default DrawerArrowIcon;
