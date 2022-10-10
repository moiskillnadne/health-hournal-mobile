declare module 'react-native-video-controls' {
  import { RefObject } from 'react';
  import { StyleProp, ViewStyle } from 'react-native';

  import Video, {
    VideoProperties,
    OnLoadData,
    OnProgressData,
    FilterType,
    TextTrackType,
    DRMSettings,
    DRMType,
    OnBufferData,
    OnExternalPlaybackChangeData,
    OnPictureInPictureStatusData,
    OnPlaybackRateData,
    OnSeekData,
    LoadError,
    OnBandwidthUpdateData,
  } from 'react-native-video';

  export {
    VideoProperties,
    OnLoadData,
    OnProgressData,
    FilterType,
    TextTrackType,
    DRMSettings,
    DRMType,
    OnBufferData,
    OnExternalPlaybackChangeData,
    OnPictureInPictureStatusData,
    OnPlaybackRateData,
    OnSeekData,
    LoadError,
    OnBandwidthUpdateData,
  };

  type VideoControlsProps = {
    toggleResizeModeOnFullscreen: boolean;
    controlAnimationTiming: number;
    doubleTapTime: number;
    playInBackground: boolean;
    playWhenInactive: boolean;
    resizeMode: string;
    isFullscreen: boolean;
    showOnStart: boolean;
    paused: boolean;
    repeat: boolean;
    muted: boolean;
    volume: number;
    title: string;
    rate: number;
    ref: RefObject<Maybe<Video>>;
    style: StyleProp<ViewStyle> | undefined;
    videoStyle: StyleProp<ViewStyle> | undefined;
    containerStyle: StyleProp<ViewStyle> | undefined;
    disablePlayPause: boolean;
    disableFullscreen: boolean;
    disableSeekbar: boolean;
    disableVolume: boolean;
    disableTimer: boolean;
    disableBack: boolean;
    onEnterFullscreen: () => unknown;
    onExitFullscreen: () => unknown;
    onHideControls: () => unknown;
    onShowControls: () => unknown;
    onPause: () => unknown;
    onPlay: () => unknown;
    onBack: () => unknown;
    tapAnywhereToPause: boolean;
    scrubbing: number;
    controlTimeout: number;
  };

  export default class VideoPlayer extends Video {
    contextType?: React.Context<any> | undefined;
    player: {
      ref: Video;
    };

    static defaultProps: VideoControlsProps;

    constructor(props: VideoProperties);
  }
}
