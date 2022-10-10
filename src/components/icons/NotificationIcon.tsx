import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, SvgProps, GProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const NotificationIcon = (props: Props) => (
  <Svg width={18} height={18} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h18v18H0z" />
      <Path
        d="M9 16.5c.825 0 1.5-.675 1.5-1.5h-3A1.5 1.5 0 0 0 9 16.5zm4.5-4.5V8.25c0-2.303-1.23-4.23-3.375-4.74V3c0-.623-.502-1.125-1.125-1.125S7.875 2.377 7.875 3v.51C5.723 4.02 4.5 5.94 4.5 8.25V12l-.967.967c-.473.473-.143 1.283.525 1.283h9.877c.667 0 1.005-.81.532-1.283L13.5 12z"
        fill="#9B57D3"
      />
    </G>
  </Svg>
);

export default NotificationIcon;
