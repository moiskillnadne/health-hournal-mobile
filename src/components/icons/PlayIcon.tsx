import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const PlayerPlayIcon = (props: Props) => (
  <Svg width={32} height={32} {...props}>
    <Path
      d="M16 0C7.168 0 0 7.168 0 16s7.168 16 16 16 16-7.168 16-16S24.832 0 16 0zm-3.2 23.2V8.8l9.6 7.2-9.6 7.2z"
      fill="#FFF"
    />
  </Svg>
);

export default PlayerPlayIcon;
