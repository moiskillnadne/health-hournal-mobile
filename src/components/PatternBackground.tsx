import { useContext, useLayoutEffect, memo } from 'react';
import { Outlet } from 'react-router-native';

import { LayoutContext } from '@app/contexts';

type Background = 'image' | 'pattern';

function PatternBackground() {
  const { setBackgroundType } = useContext(LayoutContext);

  useLayoutEffect(() => {
    let prevType: Background;

    setBackgroundType(value => {
      prevType = value;

      return 'pattern';
    });

    return () => {
      setBackgroundType(prevType);
    };
  }, [setBackgroundType]);

  return <Outlet />;
}

export default memo(PatternBackground);
