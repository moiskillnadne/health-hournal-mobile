import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const TickIcon = (props: Props) => (
  <Svg width={18} height={18} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h18v18H0z" />
      <Path
        d="M7.293 16.28c.492 0 .871-.2 1.138-.6L16.2 3.66a1.82 1.82 0 0 0 .208-.42c.044-.133.065-.264.065-.394 0-.328-.108-.598-.324-.81-.216-.21-.491-.316-.825-.316-.235 0-.43.046-.586.138-.156.092-.305.248-.449.47L7.26 13.47 3.656 8.906c-.26-.327-.581-.49-.961-.49-.34 0-.62.108-.84.324-.22.217-.33.49-.33.82 0 .148.026.29.077.429.052.138.14.28.266.425l4.295 5.3c.308.377.685.566 1.129.566z"
        fill="#9B57D3"
      />
    </G>
  </Svg>
);

export default TickIcon;
