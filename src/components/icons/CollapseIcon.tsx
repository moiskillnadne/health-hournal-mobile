import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, SvgProps, GProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const CollapseIcon = (props: Props) => (
  <Svg width={24} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path opacity={0.87} d="M24 24H0V0h24z" />
      <Path
        d="M15.88 15.29 12 11.41l-3.88 3.88a.996.996 0 1 1-1.41-1.41l4.59-4.59a.996.996 0 0 1 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41-.39.38-1.03.39-1.42 0z"
        fill={props.fill || '#000'}
      />
    </G>
  </Svg>
);

export default CollapseIcon;
