import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const G = g as ComponentClass<PropsWithChildren<GProps>>;

const ArrowIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          d="M6.707 12.05c0-.166.031-.321.093-.465.063-.144.16-.28.291-.41l7.612-7.443c.22-.22.486-.33.798-.33.213 0 .406.05.578.151.171.101.309.237.413.407a1.138 1.138 0 0 1-.197 1.397l-6.862 6.696 6.862 6.691a1.13 1.13 0 0 1-.216 1.802 1.12 1.12 0 0 1-.578.151 1.1 1.1 0 0 1-.798-.321l-7.612-7.45a1.179 1.179 0 0 1-.385-.876z"
          fill="#FFF"
        />
      </G>
    </Svg>
  );
};

export default ArrowIcon;
