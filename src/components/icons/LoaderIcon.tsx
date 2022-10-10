import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const LoaderIcon = ({ fill = '#9B57D3', ...props }: Props) => {
  return (
    <Svg width={44} height={44} {...props}>
      <Path
        d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22a2 2 0 1 1 4 0c0 9.941 8.059 18 18 18s18-8.059 18-18S31.941 4 22 4a2 2 0 1 1 0-4z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default LoaderIcon;
