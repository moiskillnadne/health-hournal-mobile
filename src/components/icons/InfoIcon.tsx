import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, SvgProps, GProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const InfoIcon = (props: Props) => (
  <Svg width={16} height={16} {...props}>
    <G fill="none">
      <Path
        d="M8 16c-1.133 0-2.187-.203-3.16-.61A7.808 7.808 0 0 1 2.3 13.7a7.808 7.808 0 0 1-1.69-2.54C.203 10.187 0 9.133 0 8c0-1.12.203-2.167.61-3.14.407-.973.97-1.82 1.69-2.54A7.942 7.942 0 0 1 4.84.62 8.006 8.006 0 0 1 8 0a7.95 7.95 0 0 1 3.14.62 7.94 7.94 0 0 1 2.54 1.7 7.942 7.942 0 0 1 1.7 2.54c.413.973.62 2.02.62 3.14a8.006 8.006 0 0 1-.62 3.16 7.942 7.942 0 0 1-1.7 2.54 7.808 7.808 0 0 1-2.54 1.69c-.973.407-2.02.61-3.14.61z"
        fill="#EBDDF6"
      />
      <Path
        d="M7 12.8h2V8H7v4.8zM8 6a.99.99 0 0 0 .712-.273A.918.918 0 0 0 9 5.03c0-.283-.096-.525-.288-.727A.943.943 0 0 0 8 4a.943.943 0 0 0-.712.303A1.019 1.019 0 0 0 7 5.03c0 .283.096.515.288.697C7.48 5.91 7.718 6 8 6z"
        fill="#9B57D3"
      />
    </G>
  </Svg>
);

export default InfoIcon;
