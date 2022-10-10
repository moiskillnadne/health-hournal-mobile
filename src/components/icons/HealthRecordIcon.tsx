import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const HealthRecordIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <Path
        d="M5 6h2v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6h2v14h2V6c0-1.1-.9-2-2-2h-4.18C14.4 2.84 13.3 2 12 2c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14v-2H5V6zm14 14h2a2 2 0 0 1-2 2v-2zM12 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"
        fill="#FFF"
      />
    </Svg>
  );
};

export default HealthRecordIcon;
