import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function BarHighChart({ weeklyRecordsData }) {
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
      backgroundColor: 'transparent',
      height: 380,
    },
    title: {
      text: '주간 기록',
      margin: 40,
      style: {
        color: 'white',
        fontSize: 15,
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
          fontSize: 15,
        },
      },
    },
    yAxis: {
      title: {
        text: '시간',
        style: {
          color: 'white',
          fontSize: 15,
        },
      },
      gridLineColor: '#ffffff',
      // tickInterval: , 눈금선 20개 만드는 식 세우기
      labels: {
        enabled: false,
      },
    },
    tooltip: {
      valueSuffix: '시간',
    },
    plotOptions: {
      series: {
        pointWidth: 40,
      },
    },
    series: [
      {
        name: '요일별 시간 기록',
        showInLegend: false,
        data: [
          // secondsToHour(weeklyRecordsData, '0'),
          // secondsToHour(weeklyRecordsData, '1'),
          // secondsToHour(weeklyRecordsData, '2'),
          // secondsToHour(weeklyRecordsData, '3'),
          // secondsToHour(weeklyRecordsData, '4'),
          40, 40, 50, 20, 2,
        ],
        color: '#ffffff',
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
