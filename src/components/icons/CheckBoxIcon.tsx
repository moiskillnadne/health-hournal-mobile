import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Rect, Path, GProps } from 'react-native-svg';

import { withIconStyles } from '@app/hocs';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

const CheckBoxIcon = () => {
  return (
    <Svg width={24} height={24}>
      <G fill="none" fillRule="evenodd">
        <Rect fill="#3EA82B" width={24} height={24} rx={4} />
        <Path
          d="M10.502 16.999a.92.92 0 0 1-.684-.315l-3.543-3.947a1.125 1.125 0 0 1 .012-1.488.902.902 0 0 1 1.357.012l2.83 3.154 5.856-7.07a.902.902 0 0 1 1.355-.072c.393.39.422 1.056.066 1.487l-6.538 7.895a.926.926 0 0 1-.691.345l-.02-.001z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
};

export default withIconStyles(CheckBoxIcon);
