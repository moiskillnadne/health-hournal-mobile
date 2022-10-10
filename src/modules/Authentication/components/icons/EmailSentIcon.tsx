import { PropsWithChildren, ComponentClass } from 'react';

import Svg, { G as g, Path, GProps, SvgProps, Rect } from 'react-native-svg';

type Props = SvgProps;

const G = g as ComponentClass<PropsWithChildren<GProps>>;

const EmailSentIcon = (props: Props) => {
  return (
    <Svg width={67} height={50} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h67v50H0z" />
        <G transform="translate(0 8)">
          <Path
            d="M59.728 0c2.196 0 3.977 1.679 3.977 3.75 0 .237-.024.474-.072.708L60.42 20.224h-2.043l3.292-15.993c.024-.118.037-.237.037-.356 0-.99-.817-1.798-1.848-1.87L59.71 2H28.09c-.9 0-1.685.567-1.923 1.374l-.036.145-4.578 22.25a1.765 1.765 0 0 0-.036.356c0 .99.816 1.798 1.847 1.87l.149.005h15.595v2H23.473c-2.196 0-3.977-1.679-3.977-3.75 0-.237.024-.474.072-.708l4.585-22.5C24.513 1.276 26.152 0 28.058 0h31.67z"
            fill="#FFF"
            fillRule="nonzero"
          />
          <Path
            d="m26.155 1.488 14.51 12.972a2 2 0 0 0 2.437.178L62.07 2.102"
            stroke="#FFF"
            strokeWidth={2}
          />
          <Path
            d="M60.936 23c.226 0 .445.091.616.256l5.128 4.965A1.07 1.07 0 0 1 67 29l-.002.07a1.09 1.09 0 0 1-.318.709l-5.128 4.965c-.39.376-.98.333-1.32-.098a1.101 1.101 0 0 1-.232-.681V30H46a1 1 0 0 1 0-2h14v-3.965c0-.572.419-1.035.936-1.035z"
            fill="#FFF"
          />
          <Rect fill="#FFF" x={6} y={6} width={12} height={2} rx={1} />
          <Rect fill="#FFF" x={3} y={16} width={12} height={2} rx={1} />
          <Rect fill="#FFF" y={26} width={12} height={2} rx={1} />
        </G>
      </G>
    </Svg>
  );
};

export default EmailSentIcon;
