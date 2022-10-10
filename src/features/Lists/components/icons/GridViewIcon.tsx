import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const G = g as ComponentClass<PropsWithChildren<GProps>>;

const GridViewIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          d="M5 4h4.667a1 1 0 0 1 1 1v4.667a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 9.333h4.667a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4.667a1 1 0 0 1 1-1zM14.333 4H19a1 1 0 0 1 1 1v4.667a1 1 0 0 1-1 1h-4.667a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 9.333H19a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1h-4.667a1 1 0 0 1-1-1v-4.667a1 1 0 0 1 1-1z"
          fill={props.color}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
};

export default GridViewIcon;
