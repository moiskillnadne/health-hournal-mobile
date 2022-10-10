import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const G = g as ComponentClass<PropsWithChildren<GProps>>;

const PencilIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          fill={props.fill || '#9B57D3'}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
};

export default PencilIcon;
