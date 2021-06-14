import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

export default function BarChart({ margin }) {
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
            max: 15,
            stepSize: 2,
            fontSize: 15,
            fontColor: 'white',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 15,
            fontColor: 'white',
            fontStyle: 'bold',
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
      text: 'Last week',
      fontSize: 13,
    },
  };

  return (
    <BarStyle>
      <Bar
        data={{
          labels: ['월요일', '화요일', '수요일', '목요일', '금요일'],
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
        height={80}
        options={options}
      />
    </BarStyle>
  );
}

const BarStyle = styled.div`
  margin-bottom: 50px;
`;
