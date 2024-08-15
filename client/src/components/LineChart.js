import React from 'react';
import { ResponsiveLine } from '@nivo/line';

import { calcEngagement, formatDate } from '../util/functions.js';

export default function SimpleLineChart({ followerData, posts, chartType }) {
  let chartData;
  let tickValues;

  const yAxisLegend =
    chartType === 'Followers'
      ? 'Followers'
      : chartType === 'Engagement'
      ? 'Engagement'
      : chartType === 'Comments'
      ? 'Comments Per Post'
      : chartType === 'Likes'
      ? 'Likes Per Post'
      : '';

  const chartColors = {
    Followers: '#9b51e0', // Blue
    Engagement: '#365cf5', // Green
    Comments: '#f2994a', // Red
    Likes: '#219653', // Orange
  };

  const selectedColor = chartColors[chartType] || '#000';

  if (chartType === 'Followers') {
    chartData = [
      {
        id: 'Followers',
        data: Object.entries(followerData.followers).map(
          ([date, followers]) => ({
            x: date,
            y: followers,
          })
        ),
      },
    ];
    const dates = Object.keys(followerData.followers);
    tickValues = dates.filter((_, index) => index % 5 === 0);
  } else if (chartType === 'Engagement') {
    chartData = [
      {
        id: 'Engagement',
        data: posts
          .map((post) => {
            const engagement = calcEngagement(
              followerData.followers['7-29-24'],
              post.likes,
              post.comments.length
            );
            const date = post.igTimestamp;
            return {
              x: formatDate(date),
              y: engagement,
            };
          })
          .reverse(),
      },
    ];

    const dates = chartData[0].data.map((dataPoint) => dataPoint.x);
    tickValues = dates.filter((_, index) => index % 10 === 0);
  } else if (chartType === 'Comments') {
    chartData = [
      {
        id: 'Comments',
        data: posts
          .map((post) => {
            const comments = post.comments.length;
            const date = post.igTimestamp;
            return {
              x: formatDate(date),
              y: comments,
            };
          })
          .reverse(),
      },
    ];
    const dates = chartData[0].data.map((dataPoint) => dataPoint.x);
    tickValues = dates.filter((_, index) => index % 10 === 0);
  } else if (chartType === 'Likes') {
    chartData = [
      {
        id: 'Likes',
        data: posts
          .map((post) => {
            const likes = post.likes;
            const date = post.igTimestamp;
            return {
              x: formatDate(date),
              y: likes,
            };
          })
          .reverse(),
      },
    ];
    const dates = chartData[0].data.map((dataPoint) => dataPoint.x);
    tickValues = dates.filter((_, index) => index % 10 === 0);
  }

  const MyResponsiveLine = () => (
    <ResponsiveLine
      data={chartData}
      colors={selectedColor}
      margin={{ top: 50, right: 110, bottom: 50, left: 75 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=' >-.2f'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
        truncateTickAt: 0,
        tickValues: tickValues,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yAxisLegend,
        legendOffset: -80,
        legendPosition: 'middle',
        truncateTickAt: 5,
      }}
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
          anchor: 'top-right',
          direction: 'column',
          justify: false,
          translateX: 140,
          translateY: 50,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 120,
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
