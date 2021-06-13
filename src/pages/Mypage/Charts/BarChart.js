import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart() {
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
            max: 13,
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
      display: true, // 차트 제목
      text: 'Last week',
      fontSize: 13,
    },
  };

  return (
    <Bar
      data={{
        labels: ['mon', 'tue', 'wed', 'thur', 'fri'],
        datasets: [
          {
            label: 'Spending Time in Wecode',
            data: [10, 5, 8, 10, 12],
            fill: false,
            backgroundColor: '#0066ff',
            stepSize: 1,
          },
        ],
      }}
      width={180}
      height={60}
      options={options}
    />
  );
}
