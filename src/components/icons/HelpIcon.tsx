import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps } from 'react-native-svg';

const G = g as ComponentClass<PropsWithChildren<GProps>>;

type Props = SvgProps;

const HelpIcon = (props: Props) => {
  return (
    <Svg width={16} height={16} onPress={props.onPress}>
      <G fill="#9B57D3" fillRule="evenodd">
        <Path
          d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8z"
          fillRule="nonzero"
          fill="#EBDDF6"
        />
        <Path d="M8 11.2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm.488-7.968a3.202 3.202 0 0 0-3.544 2.232.725.725 0 0 0 .696.936h.16c.328 0 .592-.232.704-.536a1.602 1.602 0 0 1 1.84-1.024c.76.16 1.32.904 1.256 1.68-.08 1.072-1.296 1.304-1.96 2.304 0 .008-.008.008-.008.016-.008.016-.016.024-.024.04-.072.12-.144.256-.2.4-.008.024-.024.04-.032.064-.008.016-.008.032-.016.056-.096.272-.16.6-.16 1h1.6a1.7 1.7 0 0 1 .224-.856c.016-.024.024-.048.04-.072.064-.112.144-.216.224-.312.008-.008.016-.024.024-.032.08-.096.168-.184.264-.272.768-.728 1.808-1.32 1.592-2.848-.192-1.392-1.288-2.568-2.68-2.776z" />
      </G>
    </Svg>
  );
};

export default HelpIcon;
