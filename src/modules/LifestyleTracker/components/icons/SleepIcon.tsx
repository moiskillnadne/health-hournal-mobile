import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const SleepIcon = (props: Props) => (
  <Svg width={12} height={12} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h12v12H0z" />
      <Path
        d="M5.294 1.299a4.987 4.987 0 0 1 2.58-.221l-.42.291-.29.21-.144.111-.29.232c-1.343 1.112-1.557 3.366-.875 4.702.538 1.053 2.137 2.845 3.948 2.714l.357-.033.174-.02.336-.05.162-.029a4.987 4.987 0 0 1-2.118 1.49 5.002 5.002 0 0 1-6.409-2.989A5.002 5.002 0 0 1 5.294 1.3z"
        fill="#000"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

export default SleepIcon;
