import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart() {
  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 2,
          },
        },
      ],
    },
    maintainAspectRatio: true,
    animation: {
      duration: 3000,
    },
    title: {
      display: true,
      text: 'full period',
    },
  };

  return (
    <Line
      data={{
        labels: ['mon', 'tue', 'wed', 'thur', 'fri'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [7, 10, 13, 6, 100],
            fill: false,
            borderColor: '#0066ff',
            tension: 0.1,
          },
        ],
      }}
      width={180}
      height={60}
      options={options}
    />
  );
}
