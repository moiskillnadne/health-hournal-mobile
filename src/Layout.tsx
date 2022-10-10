import { useState, useMemo, memo, useLayoutEffect } from 'react';
import { ImageBackground, StyleSheet, StatusBar, Platform } from 'react-native';
import { Box } from 'native-base';
import { Outlet } from 'react-router-native';

import { LayoutContext } from '@app/contexts';
import { NotificationOffline } from '@app/components';

import { BackgroundImage, PublicBackgroundImage } from '@assets/images';

type Background = 'image' | 'pattern';

function Layout() {
  const [type, setType] = useState<Background>('pattern');

  const isPattern = type === 'pattern';
  const background = type === 'image' ? PublicBackgroundImage : BackgroundImage;

  const context = useMemo(
    () => ({
      setBackgroundType: setType,
    }),
    [],
  );

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(type === 'pattern' ? '#3b2272' : 'black');
    }
  }, [type]);

  return (
    <>
      <ImageBackground
        source={background}
        resizeMode={isPattern ? 'repeat' : 'cover'}
        style={styles.imageBackground}
      >
        <Box flex={1} bgColor={`rgba(0,0,0,${isPattern ? 0.2 : 0.0})`}>
          <LayoutContext.Provider value={context}>
            <Outlet />
            <NotificationOffline />
          </LayoutContext.Provider>
        </Box>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});

export default memo(Layout);
