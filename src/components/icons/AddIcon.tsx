import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, SvgProps, GProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const AddIcon = (props: Props) => (
  <Svg width={24} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path fill="#3EA832" fillRule="nonzero" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    </G>
  </Svg>
);

export default AddIcon;
