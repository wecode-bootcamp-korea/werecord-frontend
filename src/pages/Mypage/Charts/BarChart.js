import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

export default function BarChart({ weeklyRecordsData }) {
  return (
    <BarStyle>
      <Bar
        width={120}
        height={45}
        options={options}
        data={{
          labels: ['월', '화', '수', '목', '금'],
          datasets: [
            {
              label: 'Spending Time in Wecode',
              data: [
                secondsToHour(weeklyRecordsData, '0'),
                secondsToHour(weeklyRecordsData, '1'),
                secondsToHour(weeklyRecordsData, '2'),
                secondsToHour(weeklyRecordsData, '3'),
                secondsToHour(weeklyRecordsData, '4'),
              ],
              fill: false,
              backgroundColor: '#0066ff',
              stepSize: 1,
            },
          ],
        }}
      />
    </BarStyle>
  );
}

const BarStyle = styled.div`
  margin-bottom: 50px;
`;

const secondsToHour = (data, days) => Math.ceil(data[days] / 360) / 10;

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
          max: 14,
          stepSize: 2,
          fontSize: 15,
          fontColor: 'white',
        },
        gridLines: {
          drawOnChartArea: false,
          color: '#FFFFFF',
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
        gridLines: {
          drawOnChartArea: false,
          drawBorder: false,
        },
      },
    ],
  },

  maintainAspectRatio: true,
  animation: {
    duration: 2000,
  },
  title: {
    display: true,
    text: 'Last week',
    fontSize: 18,
    fontColor: 'white',
  },
};
