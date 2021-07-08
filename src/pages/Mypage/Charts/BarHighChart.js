import React from 'react';
import Styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function LineHighChart({ weeklyRecordsData }) {
  const getMaxTimeInWeeklyTimeData = timeData => {
    const weeklyHourArray = Object.values(timeData).map(
      second => Math.round(second / 360) / 10
    );

    const MaxHour = Math.ceil(Math.max(...weeklyHourArray));
    if (MaxHour % 2 === 0) {
      return MaxHour;
    } else {
      return MaxHour + 1;
    }
  };

  const secondsToHour = (data, days) => Math.round(data[days] / 360) / 10;

  const options = {
    chart: {
      type: 'column',
      backgroundColor: '#212121',
      height: 330,
    },
    title: {
      text: '주간 기록',
      margin: 40,
      style: {
        color: 'white',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: ['월', '화', '수', '목', '금'],
      tickmarkPlacement: 'on',
      title: {
        enabled: false,
      },
      labels: {
        style: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
    },
    yAxis: {
      max: getMaxTimeInWeeklyTimeData(weeklyRecordsData),
      title: {
        text: '시간 (hour)',
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
          fontSize: 15,
          fontWeight: 'bold',
        },
      },
    },
    tooltip: {
      split: true,
      valueSuffix: 'hours',
    },
    plotOptions: {
      series: {
        borderColor: '#0066ff',
        pointWidth: 50,
      },
    },
    series: [
      {
        name: '요일별 시간 기록',
        showInLegend: false,
        data: [
          secondsToHour(weeklyRecordsData, '0'),
          secondsToHour(weeklyRecordsData, '1'),
          secondsToHour(weeklyRecordsData, '2'),
          secondsToHour(weeklyRecordsData, '3'),
          secondsToHour(weeklyRecordsData, '4'),
        ],
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1.8 },
          stops: [
            [0, '#0066ff'],
            [1, 'transparent'],
          ],
        },
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
