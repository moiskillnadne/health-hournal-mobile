import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const G = g as ComponentClass<PropsWithChildren<GProps>>;

const ListViewIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          d="M4 6.667h16a1.333 1.333 0 1 1 0 2.666H4a1.333 1.333 0 1 1 0-2.666zm0 8h16a1.333 1.333 0 1 1 0 2.666H4a1.333 1.333 0 1 1 0-2.666z"
          fill={props.color}
        />
      </G>
    </Svg>
  );
};

export default ListViewIcon;
