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
    Followers: '#9b51e0',
    Engagement: '#365cf5',
    Comments: '#f2994a',
    Likes: '#219653',
  };

  const selectedColor = chartColors[chartType] || '#000';

  if (chartType === 'Followers') {
    chartData = [
      {
        id: 'Followers',
        data: Object.entries(followerData.followers).map(
          ([date, followers]) => ({
            x: new Date(date), // Convert to Date object
            y: followers,
          })
        ),
      },
    ];
    tickValues = 'every 5 days'; // Customize as needed
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
            return {
              x: new Date(post.igTimestamp), // Convert to Date object
              y: engagement,
            };
          })
          .reverse(),
      },
    ];
    tickValues = 'every 10 days'; // Customize as needed
  } else if (chartType === 'Comments') {
    chartData = [
      {
        id: 'Comments',
        data: posts
          .map((post) => ({
            x: new Date(post.igTimestamp), // Convert to Date object
            y: post.comments.length,
          }))
          .reverse(),
      },
    ];
    tickValues = 'every 10 days'; // Customize as needed
  } else if (chartType === 'Likes') {
    chartData = [
      {
        id: 'Likes',
        data: posts
          .map((post) => ({
            x: new Date(post.igTimestamp), // Convert to Date object
            y: post.likes,
          }))
          .reverse(),
      },
    ];
    tickValues = 'every 10 days'; // Customize as needed
  }

  const MyResponsiveLine = () => (
    <ResponsiveLine
      data={chartData}
      colors={selectedColor}
      margin={{ top: 50, right: 110, bottom: 50, left: 120 }}
      xScale={{
        type: 'time', // Change to time scale
        format: '%Y-%m-%d %H:%M',
        precision: 'minute', // Adjust precision as needed
      }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%b %d', // Format tick values (e.g., 'Aug 05 11:00')
        tickValues: tickValues, // Customize tick interval
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yAxisLegend,
        legendOffset: -80,
        legendPosition: 'middle',
      }}
      pointSize={7}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel='data.yFormatted'
      pointLabelYOffset={-12}
      enableCrosshair={true}
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
