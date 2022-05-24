import { Serie } from './types';

export const monthsOptions = [
  { label: 'Jan', value: 'Jan' },
  { label: 'Feb', value: 'Feb' },
  { label: 'Mar', value: 'Mar' },
  { label: 'Apr', value: 'Apr' },
  { label: 'May', value: 'May' },
  { label: 'Jun', value: 'Jun' },
  { label: 'Jul', value: 'Jul' },
  { label: 'Aug', value: 'Aug' },
  { label: 'Sept', value: 'Sept' },
  { label: 'Oct', value: 'Oct' },
  { label: 'Nov', value: 'Nov' },
  { label: 'Dec', value: 'Dec' }
];

export const getChartOptions = (
  monthSelected: number,
  year: number,
  data: Serie[],
  title?: string,
  subTitle?: string,
  xAxisTitle?: string,
  yAxisTitle?: string
) => {
  return {
    chart: {
      type: 'column'
    },

    title: {
      text: title,
      style: {
        fontWeight: 'bold'
      }
    },

    subtitle: {
      text: subTitle
    },

    yAxis: {
      title: {
        text: yAxisTitle,
        style: {
          fontWeight: 'bold'
        }
      }
    },
    lang: {
      noData: 'There is no data for this month'
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 24 * 3600 * 1000, // 1 day
      labels: {
        step: 1,
        style: {
          width: '2px',
          fontSize: '12px',
          fontFamily: 'Arial,sans-serif'
        }
      }
    },

    tooltip: {
      pointFormat: 'Value: {point.y:.2f} hours'
    },

    plotOptions: {
      series: {
        pointInterval: 24 * 3600 * 1000,
        pointStart: Date.UTC(year, monthSelected, 1)
      }
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    },

    credits: {
      enabled: false
    }
  };
};
