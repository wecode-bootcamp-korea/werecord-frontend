import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ totalAccumulateRecordsData }) {
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
            stepSize: 50,
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
      text: 'Full period',
      fontSize: 18,
      fontColor: 'white',
    },
  };

  const totalData = type => {
    if (type === 'afterDday') {
      const result = Object.keys(totalAccumulateRecordsData).map(
        day => `${parseInt(day) + 1}회차`
      );
      return result;
    } else if (type === 'totalHours') {
      const result = totalAccumulateRecordsData.map(hours =>
        Math.ceil(hours / 360 / 10)
      );
      return result;
    }
  };

  function getMaxyAxesValue() {
    const lastAccumulatedTime =
      totalAccumulateRecordsData[totalAccumulateRecordsData.length - 1];
    const result = Math.ceil(lastAccumulatedTime / 360 / 10);
    return result;
  }

  return (
    <Line
      data={{
        labels: totalData('afterDday'),
        datasets: [
          {
            label: 'Spending Time in Wecode',
            data: totalData('totalHours'),
            fill: false,
            borderColor: '#0066ff',
            backgroundColor: '#0066ff',
            tension: 0.1,
            pointRadius: 2,
          },
        ],
      }}
      width={180}
      height={80}
      options={options}
    />
  );
}
