import { memo, useContext, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-native';

import { LayoutContext } from '@app/contexts';

type Background = 'image' | 'pattern';

function ImageBackground() {
  const { setBackgroundType } = useContext(LayoutContext);

  useLayoutEffect(() => {
    let prevType: Background;

    setBackgroundType(value => {
      prevType = value;

      return 'image';
    });

    return () => {
      setBackgroundType(prevType);
    };
  }, [setBackgroundType]);

  return <Outlet />;
}

export default memo(ImageBackground);
