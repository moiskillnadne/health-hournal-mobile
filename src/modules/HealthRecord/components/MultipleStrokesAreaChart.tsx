import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { Box } from 'native-base';
import { VictoryTheme, VictoryChart, VictoryArea, VictoryAxis } from 'victory-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

import { formatDate } from '@app/utils';

import { AnalyticsData } from '../types';

const formateXAxis = (date: number) => formatDate(date, 'd MMM');

const axisStyle = {
  grid: {
    stroke: '#d9d9d9',
    strokeWidth: 1.2,
    strokeLinecap: 'round',
    strokeDasharray: '1, 4',
  },
  axis: {
    stroke: '#d9d9d9',
    strokeWidth: 1,
  },
  ticks: {
    strokeWidth: 0,
  },
  tickLabels: {
    fill: '#aaaaaa',
    padding: 4,
  },
};

const PADDINGS_SIZE = 16 * 2;

type ChartData = {
  analytics: AnalyticsData;
  minDate: Date;
  maxDate: Date;
  minValue?: number;
  maxValue?: number;
};

type Props = {
  strokes: ChartData[];
};

function AreaChart({ strokes }: Props) {
  const { width } = useWindowDimensions();

  const minDate = strokes[0].minDate;
  const maxDate = strokes[0].maxDate;

  const minValue = useMemo(
    () => Math.min(...strokes.map(stroke => stroke.minValue ?? 0)),
    [strokes],
  );
  const maxValue = useMemo(
    () => Math.max(...strokes.map(stroke => stroke.maxValue ?? 0)),
    [strokes],
  );

  return (
    <Box
      borderColor="#e9e9e9"
      bgColor="white"
      borderWidth={strokes[0].analytics.length ? 1 : 0}
      borderRadius={4}
    >
      <VictoryChart
        theme={VictoryTheme.material}
        width={width - PADDINGS_SIZE}
        height={200}
        padding={{ left: 40, right: 20, top: 20, bottom: 40 }}
        domain={{
          x: minDate ? [minDate, maxDate] : undefined,
          y: [minValue, maxValue],
        }}
      >
        <Defs>
          <LinearGradient id="gradientStroke" y1={0} y2={1} x1={0} x2={0}>
            <Stop offset="0%" stopColor="#c6e5c3" />
            <Stop offset="100%" stopColor="#fffffe" />
          </LinearGradient>
        </Defs>

        {strokes.map((stroke, index) => (
          <VictoryArea
            key={index}
            style={{
              data: {
                fill: 'url(#gradientStroke)',
                strokeLinecap: 'round',
                stroke: '#3ea832',
                strokeWidth: 2,
              },
            }}
            data={stroke.analytics}
            y="value"
            x="date"
            interpolation="natural"
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        ))}

        <VictoryAxis style={axisStyle} tickFormat={formateXAxis} scale="time" />
        <VictoryAxis dependentAxis style={axisStyle} tickCount={4} />
      </VictoryChart>
    </Box>
  );
}

export default AreaChart;
