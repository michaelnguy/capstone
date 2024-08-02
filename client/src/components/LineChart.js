import React from 'react';

export default function LineChart() {
  // Transform the data
  const positiveSentiment = {
    id: 'Positive',
    data: rawData.map((item) => ({
      x: new Date(item.igTimestamp).toLocaleDateString('en-CA'), // Format date as YYYY-MM-DD
      y: item.sentiment.positive,
    })),
  };

  const negativeSentiment = {
    id: 'Negative',
    data: rawData.map((item) => ({
      x: new Date(item.igTimestamp).toLocaleDateString('en-CA'), // Format date as YYYY-MM-DD
      y: item.sentiment.negative,
    })),
  };

  const chartData = [positiveSentiment, negativeSentiment];
  return <div>LineChart</div>;
}
