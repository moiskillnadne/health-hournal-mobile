import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const AppointmentIcon = (props: Props) => (
  <Svg width={36} height={36} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h36v36H0z" />
      <Path
        d="M28.266 5.063h-1.547V1.969h-3.094v3.093H11.25V1.97H8.156v3.093H6.61a3.103 3.103 0 0 0-3.093 3.094v21.657a3.103 3.103 0 0 0 3.093 3.093h21.657a3.103 3.103 0 0 0 3.093-3.093V8.155a3.103 3.103 0 0 0-3.093-3.094zm0 24.75H6.609v-15.47h21.657v15.47zM6.609 11.25V8.156h21.657v3.094H6.609z"
        fill={props.fill || '#9B57D3'}
      />
      <Path
        fill={props.fill || '#3EA832'}
        d="m15.21 27.43 9.173-9.173-1.64-1.64-7.533 7.534-3.264-3.264-1.64 1.64z"
      />
    </G>
  </Svg>
);

export default AppointmentIcon;
