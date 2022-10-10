import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const SvgComponent = (props: Props) => {
  return (
    <Svg width={18} height={18} {...props}>
      <Path
        d="M5.942 3.29c-.416.36-.464.991-.108 1.41L10.087 9l-4.253 4.289a1.005 1.005 0 0 0 0 1.41.985.985 0 0 0 1.398 0l4.957-5c.385-.39.385-1.02 0-1.41L7.232 3.292a.984.984 0 0 0-1.29 0z"
        fill="#9B57D3"
      />
    </Svg>
  );
};

export default SvgComponent;
