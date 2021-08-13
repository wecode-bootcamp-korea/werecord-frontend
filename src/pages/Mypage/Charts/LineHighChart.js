import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function LineHighChart({ totalAccumulateRecordsData }) {
  const setAccumulateHoursData = totalAccumulateRecordsData =>
    totalAccumulateRecordsData.map(hours => Math.round(hours / 360) / 10);

  const options = {
    chart: {
      type: 'area',
      backgroundColor: 'transparent',
      height: 380,
    },

    title: {
      text: '전체 누적 기록',
      margin: 20,
      style: {
        color: 'white',
        fontSize: 15,
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
        },
      },
    },
    yAxis: {
      title: {
        text: '시간',
        margin: 20,
        style: {
          color: 'white',
          fontSize: 15,
        },
      },
      // tickInterval:s
      gridLineColor: '#ffffff',
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      series: {
        shadow: true,
      },
      area: {
        pointStart: 1,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 1,
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
        color: '#ffffff',
        showInLegend: false,
        // data: setAccumulateHoursData(totalAccumulateRecordsData),
        data: [5, 10, 20, 40, 60],
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
