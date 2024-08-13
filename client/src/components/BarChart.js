import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default function BarChart({
  posPercentage,
  negPercentage,
  neuPercentage,
}) {
  const averageCommentsData = [
    {
      sentiment: 'Positive',
      Percent: posPercentage,
    },
    {
      sentiment: 'Negative',
      Percent: negPercentage,
    },
    {
      sentiment: 'Neutral',
      Percent: neuPercentage,
    },
  ];

  // Function to determine bar colors based on the sentiment
  const getColor = (bar) => {
    if (bar.data.sentiment === 'Positive') return '#219653'; // Green for Positive
    if (bar.data.sentiment === 'Neutral') return '#365cf5'; // Green for Positive
    if (bar.data.sentiment === 'Negative') return '#d50100'; // Red for Negative
    return '#219653'; // Default color
  };

  const MyBarChart = () => (
    <ResponsiveBar
      data={averageCommentsData}
      keys={['Percent']}
      indexBy='sentiment'
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={getColor}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Sentiment',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Percentage',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );

  return <MyBarChart />;
}
