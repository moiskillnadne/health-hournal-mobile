import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const BottomLeftCornerIcon = (props: Props) => {
  return (
    <Svg width={250} height={125} {...props}>
      <Path
        d="M0 0c0 19.286 24.766 72.07 95.683 98.462C142.961 116.056 194.4 124.902 250 125H0Z"
        fill="#FFF"
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default BottomLeftCornerIcon;
