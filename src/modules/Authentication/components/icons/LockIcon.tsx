import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps, Rect } from 'react-native-svg';

type Props = SvgProps;

const G = g as ComponentClass<PropsWithChildren<GProps>>;

const LockIcon = (props: Props) => {
  return (
    <Svg width={50} height={50} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h50v50H0z" />
        <Rect stroke="#FFF" strokeWidth={2} x={9} y={19} width={32} height={26} rx={5} />
        <Path
          d="M33 18v-6a8 8 0 1 0-16 0"
          stroke="#FFF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default LockIcon;
