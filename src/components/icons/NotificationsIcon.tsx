import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const NotificationsIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z"
          fill="#FFF"
        />
      </G>
    </Svg>
  );
};

export default NotificationsIcon;
