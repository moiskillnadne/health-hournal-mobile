import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps;

const AdditionalInformationIcon = (props: Props) => (
  <Svg width={36} height={36} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h36v36H0z" />
      <Path
        d="M11.25 1.969v3.093h12.375V1.97h3.094v3.093h1.547a3.103 3.103 0 0 1 3.093 3.094v7.894a11.175 11.175 0 0 0-3.093-1.17V8.437H6.609v21.376h8.724a11.235 11.235 0 0 0 1.76 3.094H6.609a3.103 3.103 0 0 1-3.093-3.094V8.155a3.103 3.103 0 0 1 3.093-3.094h1.547V1.97h3.094zm3.806 20.812a11.28 11.28 0 0 0-.431 3.094H8.859v-3.094zm3.71-5.625a11.293 11.293 0 0 0-2.636 3.094H8.86v-3.094zm6.968-5.625v3.094H8.86v-3.094h16.875z"
        fill={props.fill || '#9B57D3'}
      />
      <Path
        d="M26.281 17a9.281 9.281 0 1 1 0 18.563 9.281 9.281 0 0 1 0-18.563zm0 3.094a6.187 6.187 0 1 0 0 12.375 6.187 6.187 0 0 0 0-12.375zm.039 4.508a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        fill={props.fill || '#3EA832'}
      />
    </G>
  </Svg>
);

export default AdditionalInformationIcon;
