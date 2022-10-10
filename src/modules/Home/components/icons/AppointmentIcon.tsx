import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const AppointmentIcon = (props: Props) => (
  <Svg width={24} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        d="M18.844 3.375h-1.032V1.312H15.75v2.063H7.5V1.312H5.437v2.063h-1.03a2.069 2.069 0 0 0-2.063 2.063v14.437c0 1.134.928 2.063 2.062 2.063h14.438a2.069 2.069 0 0 0 2.062-2.063V5.437a2.069 2.069 0 0 0-2.062-2.062zm0 16.5H4.406V9.562h14.438v10.313zM4.406 7.5V5.437h14.438V7.5H4.406z"
        fill="#FFF"
      />
      <Path
        fill="#FFF"
        d="m10.14 18.287 6.115-6.115-1.093-1.094-5.022 5.023-2.176-2.176-1.093 1.093z"
      />
    </G>
  </Svg>
);

export default AppointmentIcon;
