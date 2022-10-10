import React, { useRef, useState } from 'react';
import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Box, IBoxProps } from 'native-base';
import Video, { OnLoadData, OnProgressData } from 'react-native-video-controls';
import Orientation, {
  useDeviceOrientationChange,
  OrientationType,
} from 'react-native-orientation-locker';

import { Progress, Backdrop } from './components';
import { PlayIcon, ReplayIcon } from './components/icons';

type Props = {
  source: any;
  onEnd?: () => unknown;
} & IBoxProps;

function VideoPlayer({ source, onEnd, ...styleProps }: Props) {
  const playerRef = useRef<Video>(null);

  const player = playerRef.current?.player?.ref;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useDeviceOrientationChange(orientation => {
    if (orientation !== OrientationType['UNKNOWN'] && orientation !== OrientationType['PORTRAIT']) {
      enterFullscreenMode();
    } else {
      enterPortraitMode();
    }
  });

  function enterFullscreenMode() {
    setIsFullScreen(true);
    StatusBar.setHidden(true);
    Orientation.lockToLandscapeLeft();
  }

  function enterPortraitMode() {
    setIsFullScreen(false);
    StatusBar.setHidden(false);
    Orientation.lockToPortrait();
  }

  function seek(seconds: number) {
    setEndReached(false);
    player?.seek(seconds);
  }

  function pause() {
    setPaused(true);
  }

  function play() {
    setPaused(false);
  }

  function end() {
    pause();
    setEndReached(true);
    onEnd && onEnd();
  }

  function replay() {
    player?.seek(0);
    setEndReached(false);
    play();
  }

  function setInitialValues(info: OnLoadData) {
    setDuration(info.duration);
  }

  function updateCurrentTime(info: OnProgressData) {
    setCurrentTime(info.currentTime);
  }

  return (
    <Box
      safeArea
      {...styleProps}
      style={isFullScreen ? styles.fullscreenContainer : styles.container}
    >
      <Video
        ref={playerRef}
        source={source}
        style={styles.video}
        controls={false}
        resizeMode="contain"
        onProgress={updateCurrentTime}
        onLoad={setInitialValues}
        onEnd={end}
        onPause={pause}
        onEnterFullscreen={enterFullscreenMode}
        onExitFullscreen={enterPortraitMode}
        paused={paused}
        disablePlayPause={paused || endReached}
        disableSeekbar
        disableBack
        disableFullscreen={paused || endReached}
        disableTimer={endReached}
        disableVolume={paused || endReached}
      />

      {paused && !endReached && (
        <Backdrop onPress={play}>
          <PlayIcon />
        </Backdrop>
      )}

      {endReached && (
        <Backdrop onPress={replay}>
          <ReplayIcon />
        </Backdrop>
      )}

      <Progress max={duration} now={currentTime} onPress={seek} />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
  },
  video: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  fullscreenContainer: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});

export default VideoPlayer;
