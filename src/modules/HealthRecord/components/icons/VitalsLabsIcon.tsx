import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const VitalsLabsIcon = (props: Props) => (
  <Svg width={36} height={36} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h36v36H0z" />
      <Path
        d="M24.688 6.188c.614 0 .965.695.663 1.224l-.06.092-2.088 2.746v6.776l8.972 12.561c.732 1.036.08 2.496-1.108 2.595l-.13.005H6.188c-1.224 0-1.944-1.423-1.31-2.487l.073-.113 8.972-12.56V10.25l-2.088-2.746c-.38-.507-.084-1.23.497-1.31l.106-.006h12.251zm-4.446 2.999h-3.36l.04.052v8.749L8.92 29.187h19.281l-7.999-11.2V9.24l.039-.052z"
        fill={props.fill || '#A64FDA'}
        fillRule="nonzero"
      />
      <Path fill={props.fill || '#3EA832'} d="M16.238 21.818h4.528l4.233 6H12.167z" />
    </G>
  </Svg>
);

export default VitalsLabsIcon;
