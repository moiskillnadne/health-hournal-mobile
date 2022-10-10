import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps } from 'react-native-svg';

import { withIconStyles } from '@app/hocs';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = {
  fill: string;
};

const LockIcon = (props: Props) => {
  const { fill } = props;

  return (
    <Svg width={18} height={18}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h18v18H0z" />
        <Path
          d="M14.031 6.3h-.656V4.5C13.375 2.019 11.412 0 9 0S4.625 2.019 4.625 4.5v1.8h-.656C2.884 6.3 2 7.208 2 8.325v7.65C2 17.092 2.884 18 3.969 18H14.03c1.086 0 1.97-.908 1.97-2.025v-7.65c0-1.117-.884-2.025-1.969-2.025zM6.375 4.5c0-1.489 1.178-2.7 2.625-2.7s2.625 1.211 2.625 2.7v1.8h-5.25V4.5z"
          fill={fill}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
};

export default withIconStyles(LockIcon);
