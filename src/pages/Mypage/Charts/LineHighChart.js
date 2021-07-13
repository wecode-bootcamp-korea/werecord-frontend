import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function LineHighChart({ totalAccumulateRecordsData }) {
  const setAccumulateHoursData = totalAccumulateRecordsData =>
    totalAccumulateRecordsData.map(hours => Math.round(hours / 360) / 10);

  const options = {
    chart: {
      type: 'area',
      backgroundColor: '#212121',
      height: 330,
    },

    title: {
      text: '전체 누적 기록',
      margin: 20,
      style: {
        color: 'white',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      allowDecimals: false,
      labels: {
        formatter: function () {
          return `${this.value}일`;
        },
        style: {
          color: 'white',
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
      gridLineWidth: 0,
    },
    yAxis: {
      title: {
        text: '시간 (Hour)',
        margin: 20,
        style: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      gridLineDashStyle: 'longdash',
      gridLineColor: '#494949',
      labels: {
        style: {
          color: 'white',
          fontSize: 13,
          fontWeight: 'bold',
        },
      },
    },

    plotOptions: {
      series: {
        shadow: true,
      },
      area: {
        pointStart: 1,
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: '총 누적 시간',
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 2.5 },
          stops: [
            [0, '#0066ff'],
            [1, 'transparent'],
          ],
        },
        showInLegend: false,
        data: setAccumulateHoursData(totalAccumulateRecordsData),
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
