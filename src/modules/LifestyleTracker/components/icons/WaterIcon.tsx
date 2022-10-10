import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const WaterIcon = (props: Props) => (
  <Svg width={12} height={12} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h12v12H0z" />
      <Path
        d="M6 1.82c1.952 3.023 3 5.117 3 6.299 0 .792-.333 1.508-.868 2.027-.546.529-1.3.854-2.132.854a3.052 3.052 0 0 1-2.132-.854A2.816 2.816 0 0 1 3 8.119c0-1.182 1.048-3.276 3-6.3z"
        stroke="#000"
        strokeWidth={2}
      />
    </G>
  </Svg>
);

export default WaterIcon;
