import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { createSentimentDataStructure } from '../util/functions';

export default function SentimentLineChart({ posts }) {
  const sentimentData = createSentimentDataStructure(posts);

  const tickValues = 'every 20 days';

  const MyResponsiveLine = () => (
    <ResponsiveLine
      data={sentimentData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d %H:%M',
        precision: 'minute',
      }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      yFormat=' >-.2f'
      curve='cardinal'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%b %d',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
        tickValues: tickValues,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Percentage',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors={['#219653', '#365cf5', '#d50100']}
      enablePoints={true}
      pointSize={5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel='data.yFormatted'
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );

  return <MyResponsiveLine />;
}
