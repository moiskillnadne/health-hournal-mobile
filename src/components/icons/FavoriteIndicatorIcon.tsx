import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
  bgColor?: string;
};

const G = g as ComponentClass<PropsWithChildren<GProps>>;

const SvgComponent = ({ bgColor = '#9B57D3', ...props }: Props) => (
  <Svg width={24} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        d="M5.82 23.743c-.402.33-.821.342-1.258.035-.437-.307-.573-.709-.408-1.205l2.339-7.619-6.024-4.323c-.426-.307-.561-.703-.408-1.187.154-.484.49-.727 1.01-.727h7.477L10.923.78a.969.969 0 0 1 .407-.585c.2-.13.408-.195.62-.195.213 0 .42.065.62.195a.97.97 0 0 1 .408.585l2.374 7.937h7.477c.52 0 .857.243 1.01.727.154.484.018.88-.407 1.187l-6.025 4.323 2.34 7.62c.165.495.029.897-.408 1.204-.437.307-.857.295-1.258-.035l-6.13-4.678-6.131 4.678z"
        fill={bgColor}
      />
    </G>
  </Svg>
);

export default SvgComponent;
