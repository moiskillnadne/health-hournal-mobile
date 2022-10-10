import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const MedicationIcon = (props: Props) => (
  <Svg width={36} height={36} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h36v36H0z" />
      <Path
        d="M16.44 6.126a9.5 9.5 0 0 1 13.434 0 9.504 9.504 0 0 1 1.89 10.742 9.911 9.911 0 0 0-2.773-1.158 6.5 6.5 0 0 0-10.263-7.625l-.167.162-4.308 4.306 5.523 5.522a10.013 10.013 0 0 0-1.883 2.36l-5.761-5.76-4.885 4.886a6.5 6.5 0 0 0 9.025 9.354l.167-.162.53-.531a9.931 9.931 0 0 0 1.366 2.87A9.5 9.5 0 0 1 5.125 17.44L16.44 6.125z"
        fill={props.fill || '#9B57D3'}
      />
      <Path
        d="M32.43 20.584A7.736 7.736 0 0 1 21.584 31.43L32.43 20.584zm-2.094-1.885L19.699 29.336a7.737 7.737 0 0 1 10.637-10.637z"
        fill={props.fill || '#3EA832'}
      />
    </G>
  </Svg>
);

export default MedicationIcon;
