import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default function BarChart({ posPercentage, negPercentage }) {
  //   const sentimentData = postsArray.reduce(
  //     (acc, post) => {
  //       const positiveSentiment = post.sentiment.positive;
  //       const negativeSentiment = post.sentiment.negative;
  //       const commentsCount = post.comments.length;

  //       if (positiveSentiment > 0) {
  //         acc.positive.totalComments += commentsCount;
  //         acc.positive.count += positiveSentiment;
  //       }

  //       if (negativeSentiment > 0) {
  //         acc.negative.totalComments += commentsCount;
  //         acc.negative.count += negativeSentiment;
  //       }

  //       return acc;
  //     },
  //     {
  //       positive: { totalComments: 0, count: 0 },
  //       negative: { totalComments: 0, count: 0 },
  //     }
  //   );
  //   console.log(sentimentData);

  const averageCommentsData = [
    {
      sentiment: 'Positive',
      Percent: posPercentage,
    },
    {
      sentiment: 'Negative',
      Percent: negPercentage,
    },
  ];

  // Function to determine bar colors based on the sentiment
  const getColor = (bar) => {
    if (bar.data.sentiment === 'Positive') return '#365cf5'; // Green for Positive
    if (bar.data.sentiment === 'Negative') return '#d50100'; // Red for Negative
    return '#333'; // Default color
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

  return (
    <div
      style={{
        height: '500px',
        width: '400px',
        backgroundColor: 'white',
        padding: '1rem',
      }}
    >
      <MyBarChart />
    </div>
  );
}
