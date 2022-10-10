import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, SvgProps, GProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const PlayerPlayIcon = (props: Props) => (
  <Svg width={64} height={64} {...props}>
    <G fill="none" fillRule="evenodd" opacity={0.6}>
      <Path d="M0 0h64v64H0z" />
      <Path
        d="M32 5.333C17.28 5.333 5.333 17.28 5.333 32 5.333 46.72 17.28 58.667 32 58.667c14.72 0 26.667-11.947 26.667-26.667C58.667 17.28 46.72 5.333 32 5.333zM26.667 44V20l16 12-16 12z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

export default PlayerPlayIcon;
