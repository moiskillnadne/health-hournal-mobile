import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps } from 'react-native-svg';

import { withIconStyles } from '@app/hocs';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = {
  fill: string;
};

const MailIcon = (props: Props) => {
  const { fill } = props;

  return (
    <Svg width={18} height={18}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h18v18H0z" />
        <Path
          d="M15 3H3c-.825 0-1.492.675-1.492 1.5l-.008 9c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5zm-.3 3.188L9.398 9.502a.759.759 0 0 1-.796 0L3.3 6.188a.637.637 0 1 1 .675-1.08L9 8.25l5.025-3.143a.637.637 0 1 1 .675 1.08z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default withIconStyles(MailIcon);
