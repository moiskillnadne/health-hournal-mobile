import { PropsWithChildren, memo } from 'react';
import { NativeRouter } from 'react-router-native';

type Props = PropsWithChildren<unknown>;

function RouteProvider({ children }: Props) {
  return <NativeRouter>{children}</NativeRouter>;
}

export default memo(RouteProvider);
