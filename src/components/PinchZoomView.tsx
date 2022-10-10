import { useState, useRef } from 'react';
import { ScrollView } from 'native-base';
import {
  ReactNativeZoomableView,
  ReactNativeZoomableViewProps,
} from '@openspacelabs/react-native-zoomable-view';

import { useDebouncedCallback } from 'use-debounce';

function PinchZoomView({ children, ...props }: ReactNativeZoomableViewProps) {
  const zoomLevelRef = useRef<number>(0);
  const zoomableViewRef = useRef<ReactNativeZoomableView>();

  const [isZooming, setIsZooming] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const resetZoom = useDebouncedCallback(() => {
    zoomableViewRef.current?.zoomTo(1);
    setZoomed(false);
    setIsZooming(false);
  }, 200);

  return (
    <ScrollView _contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={!(isZooming && zoomed)}>
      <ReactNativeZoomableView
        zoomEnabled={zoomEnabled}
        maxZoom={3}
        minZoom={1}
        zoomStep={1}
        initialZoom={1}
        bindToBorders
        pinchToZoomOutSensitivity={3}
        ref={ref => {
          if (ref) {
            zoomableViewRef.current = ref;
          }
        }}
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
        onZoomBefore={() => {
          setIsZooming(true);
        }}
        onZoomAfter={(_, gestureState, zoomableViewEventObject) => {
          let { zoomLevel } = zoomableViewEventObject;

          if (zoomLevelRef.current > zoomLevel && zoomLevel < 1.1) {
            zoomLevel = 1;

            resetZoom();
          }

          zoomLevelRef.current = zoomLevel;
        }}
        onZoomEnd={(_, gestureState, zoomableViewEventObject) => {
          setIsZooming(false);
          setZoomed(zoomableViewEventObject.zoomLevel > 1);
        }}
        onShiftingBefore={(event, _, zoomableViewEventObject) => {
          return zoomableViewEventObject.zoomLevel === 1;
        }}
        onPanResponderMove={(event, gestureState) => {
          setZoomEnabled(zoomed || gestureState.numberActiveTouches > 1);

          return false;
        }}
        {...props}
      >
        {children}
      </ReactNativeZoomableView>
    </ScrollView>
  );
}

export default PinchZoomView;
