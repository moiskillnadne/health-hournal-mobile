import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const LifestyleTrackerIcon = (props: Props) => {
  return (
    <Svg width={24} height={24} {...props}>
      <Path
        d="M14.567 4.074a1.96 1.96 0 0 1-1.438-.6c-.4-.4-.6-.879-.6-1.437S12.73 1 13.13.6c.4-.4.88-.6 1.438-.6.558 0 1.037.2 1.437.6.4.4.6.88.6 1.437 0 .558-.2 1.037-.6 1.437-.4.4-.88.6-1.437.6zM15.264 24a.813.813 0 0 1-.6-.237.813.813 0 0 1-.237-.6V17.33l-3.014-2.763-.81 3.628a1.585 1.585 0 0 1-.725 1.047c-.39.251-.81.33-1.256.237l-4.995-1.032a.719.719 0 0 1-.488-.335.837.837 0 0 1-.126-.614.719.719 0 0 1 .335-.489.785.785 0 0 1 .586-.125l4.772.949 2.037-10.298-2.79 1.312v2.902a.813.813 0 0 1-.837.837.813.813 0 0 1-.6-.237.813.813 0 0 1-.238-.6v-2.93c0-.335.093-.642.28-.921a1.63 1.63 0 0 1 .753-.614l3.544-1.507c.577-.26.995-.424 1.256-.489.26-.065.52-.097.781-.097.372 0 .703.079.99.237.29.158.536.395.74.712l1.173 1.87c.427.688.99 1.297 1.688 1.827s1.512.87 2.442 1.019c.223.037.41.135.558.293a.77.77 0 0 1 .223.544c0 .26-.088.474-.265.642a.711.711 0 0 1-.628.195 6.256 6.256 0 0 1-2.805-1.046c-.827-.568-1.613-1.354-2.358-2.358l-1.088 4.409 2.01 1.842c.167.167.297.358.39.572.093.214.14.432.14.656v6.558a.813.813 0 0 1-.837.837z"
        fill="#FFF"
      />
    </Svg>
  );
};

export default LifestyleTrackerIcon;