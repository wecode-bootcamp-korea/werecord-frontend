import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

export default function BarChart({ weeklyRecordsData }) {
  const getMaxTimeInWeeklyTimeData = timeData => {
    const weeklyHourArray = Object.values(timeData).map(
      second => Math.round(second / 360) / 10
    );

    const MaxHour = Math.max(...weeklyHourArray);
    console.log(MaxHour);
    if (MaxHour % 2 === 0) {
      return MaxHour + 2;
    } else {
      return Math.floor(MaxHour) + 1;
    }
  };

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
            max: getMaxTimeInWeeklyTimeData(weeklyRecordsData),
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
      text: '지난 주간 기록',
      fontSize: 18,
      fontColor: 'white',
    },
  };

  return (
    <BarStyle>
      <Bar
        width={120}
        height={80}
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

const secondsToHour = (data, days) => Math.ceil(data[days] / 360) / 10;

const BarStyle = styled.div`
  margin-bottom: 50px;
`;
