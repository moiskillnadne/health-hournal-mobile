import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const WeightIcon = (props: Props) => (
  <Svg width={12} height={12} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h12v12H0z" />
      <Path
        d="M6 1a6 6 0 0 1 6 6v4h-2V7a4 4 0 0 0-3.8-3.995L6 3a4 4 0 0 0-3.995 3.8L2 7v4H0V7a6 6 0 0 1 6-6zm2.77 4.725c-1.157 2.1-1.866 3.281-2.127 3.542A1 1 0 0 1 5.23 7.852c.26-.26 1.441-.97 3.542-2.127z"
        fill="#000"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

export default WeightIcon;
