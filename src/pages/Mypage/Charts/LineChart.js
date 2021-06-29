import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ totalAccumulateRecordsData }) {
  const controlSizeOfLineDot = value => {
    if (value > 500) {
      return 2;
    } else {
      return 4;
    }
  };

  const setLabelData = totalAccumulateRecordsData =>
    Object.keys(totalAccumulateRecordsData).map(
      day => `${parseInt(day) + 1}회차`
    );

  const setAccumulateHoursData = totalAccumulateRecordsData =>
    totalAccumulateRecordsData.map(hours => Math.round(hours / 360) / 10);

  const getMaxyAxesValue = () => {
    const lastAccumulatedTime =
      totalAccumulateRecordsData[totalAccumulateRecordsData.length - 1];
    return Math.round((Math.round(lastAccumulatedTime / 360) + 100) / 10) + 10;
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

  const data = canvas => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, '#0066ff');
    gradient.addColorStop(1, 'transparent');

    return {
      labels: setLabelData(totalAccumulateRecordsData),
      datasets: [
        {
          label: '위코드에서 보낸 총 누적 시간',
          data: setAccumulateHoursData(totalAccumulateRecordsData),
          fill: true,
          tension: 0.1,
          borderColor: '#0066ff',
          backgroundColor: gradient,
          pointBackgroundColor: 'white',
          pointRadius: controlSizeOfLineDot(getMaxyAxesValue()),
        },
      ],
    };
  };

  return <Line width={120} height={70} options={options} data={data} />;
}
