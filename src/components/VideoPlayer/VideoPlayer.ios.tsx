import { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Box, IBoxProps } from 'native-base';
import Video, { OnLoadData, OnProgressData } from 'react-native-video-controls';
import Orientation, {
  PORTRAIT,
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
  const playerRef = useRef<Video | null>(null);
  const player = playerRef.current?.player?.ref;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  function setInitialValues(info: OnLoadData) {
    setDuration(info.duration);
  }

  function updateCurrentTime(info: OnProgressData) {
    setCurrentTime(info.currentTime);
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

  function enterFullscreen() {
    setIsFullScreen(true);
  }

  function exitFullscreen() {
    pause();

    Orientation.getOrientation(orientation => {
      if (orientation !== PORTRAIT) Orientation.lockToPortrait();
    });

    setIsFullScreen(false);
  }

  useDeviceOrientationChange(orientation => {
    if (orientation !== OrientationType['FACE-UP'] && orientation !== OrientationType['PORTRAIT']) {
      Orientation.lockToLandscapeLeft();
      setIsFullScreen(true);
    } else {
      Orientation.lockToPortrait();
    }
  });

  return (
    <Box {...styleProps}>
      <Box position="relative" h={styleProps.h}>
        <Video
          source={source}
          style={[styles.videoContainer]}
          videoStyle={styles.video}
          paused={paused}
          ref={playerRef}
          containerStyle={styles.videoContainer}
          onEnd={end}
          onPause={pause}
          onLoad={setInitialValues}
          onProgress={updateCurrentTime}
          fullscreen={isFullScreen}
          isFullscreen={isFullScreen}
          onEnterFullscreen={enterFullscreen}
          onFullscreenPlayerDidDismiss={exitFullscreen}
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
      </Box>

      <Progress max={duration} now={currentTime} onPress={seek} />
    </Box>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    margin: 0,
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
  },
});

export default VideoPlayer;
