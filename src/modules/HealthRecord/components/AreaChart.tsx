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

type Props = {
  data: AnalyticsData;
  minDate: Date;
  maxDate: Date;
  minValue?: number;
  maxValue?: number;
};

function AreaChart({ data, minValue = 0, maxValue = 100, minDate, maxDate }: Props) {
  const { width } = useWindowDimensions();

  return (
    <Box borderColor="#e9e9e9" bgColor="white" borderWidth={data.length ? 1 : 0} borderRadius={4}>
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

        <VictoryArea
          style={{
            data: {
              fill: 'url(#gradientStroke)',
              strokeLinecap: 'round',
              stroke: '#3ea832',
              strokeWidth: 2,
            },
          }}
          data={data}
          y="value"
          x="date"
          interpolation="natural"
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 },
          }}
        />

        <VictoryAxis style={axisStyle} tickFormat={formateXAxis} scale="time" />
        <VictoryAxis dependentAxis style={axisStyle} tickCount={4} />
      </VictoryChart>
    </Box>
  );
}

export default AreaChart;
