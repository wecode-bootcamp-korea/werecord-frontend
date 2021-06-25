import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ totalAccumulateRecordsData }) {
  const controlSizeOfLineDot = value => {
    if (value > 500) {
      return 2;
    } else {
      return 3;
    }
  };

  const setLabelData = totalAccumulateRecordsData =>
    Object.keys(totalAccumulateRecordsData).map(
      day => `${parseInt(day) + 1}회차`
    );

  const setAccumulateHoursData = totalAccumulateRecordsData =>
    totalAccumulateRecordsData.map(hours => Math.round(hours / 360 / 10));

  const getMaxyAxesValue = () => {
    const lastAccumulatedTime =
      totalAccumulateRecordsData[totalAccumulateRecordsData.length - 1];
    return (Math.round(lastAccumulatedTime / 360) + 100) / 10;
  };

  const options = {
    legend: {
      display: false,
      labels: {
        fontColor: 'white',
        fontSize: 30,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: getMaxyAxesValue(),
            stepSize: Math.floor(getMaxyAxesValue() / 5),
            fontColor: 'white',
            fontSize: 15,
            display: true,
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
            display: false,
          },
          gridLines: {
            drawOnChartArea: false,
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
      text: '전체 누적 기록',
      fontSize: 18,
      fontColor: 'white',
    },
  };

  return (
    <Line
      width={120}
      height={80}
      options={options}
      data={{
        labels: setLabelData(totalAccumulateRecordsData),
        datasets: [
          {
            label: 'Spending Time in Wecode',
            data: setAccumulateHoursData(totalAccumulateRecordsData),
            fill: false,
            borderColor: '#0066ff',
            backgroundColor: '#0066ff',
            tension: 0.1,
            pointRadius: controlSizeOfLineDot(getMaxyAxesValue()),
          },
        ],
      }}
    />
  );
}
