import { FC } from 'react';

import { IconProps } from '@app/components/icons';

const colors = {
  default: '#DEE0E6',
  active: '#9B57D3',
  error: '#ff0000',
};

function withIconStyles(WrappedSvg: FC<{ fill: string }>) {
  return function (props: IconProps) {
    const { error, active, fill } = props;

    const fillColor = error ? colors.error : active ? colors.active : colors.default;

    return <WrappedSvg fill={fill || fillColor} />;
  };
}

export default withIconStyles;
