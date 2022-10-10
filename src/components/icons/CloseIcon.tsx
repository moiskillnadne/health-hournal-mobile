import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, SvgProps, Path, GProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const CloseIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          fill="#DEE0E6"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
};

export default CloseIcon;
