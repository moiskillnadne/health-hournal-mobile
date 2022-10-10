import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const PlusIcon = (props: Props) => (
  <Svg width={32} height={32} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h32v32H0z" />
      <Path
        d="M24 17.333h-6.667V24c0 .733-.6 1.333-1.333 1.333s-1.333-.6-1.333-1.333v-6.667H8c-.733 0-1.333-.6-1.333-1.333s.6-1.333 1.333-1.333h6.667V8c0-.733.6-1.333 1.333-1.333s1.333.6 1.333 1.333v6.667H24c.733 0 1.333.6 1.333 1.333s-.6 1.333-1.333 1.333z"
        fill="#3EA832"
      />
    </G>
  </Svg>
);

export default PlusIcon;
