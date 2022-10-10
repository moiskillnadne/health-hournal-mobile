import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const ConfirmedIcon = (props: Props) => (
  <Svg width={50} height={50} {...props}>
    <Path
      d="M25 0c13.807 0 25 11.193 25 25S38.807 50 25 50 0 38.807 0 25 11.193 0 25 0zm0 2C12.297 2 2 12.297 2 25s10.297 23 23 23 23-10.297 23-23S37.703 2 25 2zm13.935 16.157a1 1 0 0 1 0 1.414l-16.97 16.97a.995.995 0 0 1-.531.278l-.118.014h-.118a.996.996 0 0 1-.648-.291l-9.192-9.193a1 1 0 0 1 1.414-1.414l8.485 8.485 16.264-16.263a1 1 0 0 1 1.414 0z"
      fill="#FFF"
      fillRule="evenodd"
    />
  </Svg>
);

export default ConfirmedIcon;
