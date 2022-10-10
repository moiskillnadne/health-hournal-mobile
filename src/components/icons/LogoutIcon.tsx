import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const LogoutIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <Path
        d="M8.5 11h11.6l-3.4-3.4 1.433-1.433L24 12.033l-5.8 5.8-1.433-1.433 3.4-3.4H8.5v-2zm3.2-11v2H2v20h9.7v2H2c-.533 0-1-.2-1.4-.6C.2 23 0 22.533 0 22V2C0 1.467.2 1 .6.6 1 .2 1.467 0 2 0h9.7z"
        fill="#FFF"
      />
    </Svg>
  );
};

export default LogoutIcon;
