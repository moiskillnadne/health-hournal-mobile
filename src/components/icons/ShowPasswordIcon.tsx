import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const ShowPasswordIcon = (props: Props) => {
  return (
    <Svg width={18} height={18} onPress={props.onPress}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h18v18H0z" />
        <Path
          d="M9 3C5.25 3 2.047 5.332.75 8.625 2.047 11.918 5.25 14.25 9 14.25s6.953-2.332 8.25-5.625C15.953 5.332 12.75 3 9 3zm0 9.375c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75zm0-6a2.247 2.247 0 0 0-2.25 2.25A2.247 2.247 0 0 0 9 10.875a2.247 2.247 0 0 0 2.25-2.25A2.247 2.247 0 0 0 9 6.375z"
          fill="#DEE0E6"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
};

export default ShowPasswordIcon;
