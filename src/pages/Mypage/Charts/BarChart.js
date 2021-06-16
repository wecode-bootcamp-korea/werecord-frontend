import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

export default function BarChart({ weeklyRecordsData }) {
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

  const secondsToHour = parameter =>
    Math.ceil(weeklyRecordsData[parameter] / 360) / 10;

  return (
    <BarStyle>
      <Bar
        data={{
          labels: ['월', '화', '수', '목', '금'],
          datasets: [
            {
              label: 'Spending Time in Wecode',
              data: [
                secondsToHour('0'),
                secondsToHour('1'),
                secondsToHour('2'),
                secondsToHour('3'),
                secondsToHour('4'),
              ],
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
