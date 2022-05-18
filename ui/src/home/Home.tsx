import './Home.css';
import React, { useState } from 'react';
import Select from 'react-select';
import { getChartOptions, monthsOptions } from './options';
import { Month } from './types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useFetch from '../hooks/useFetch';
import { KGB_API_URL } from '../constants';

const Home: React.FC = () => {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState<Month>(
    Object.values(Month)[today.getMonth()]
  );
  const { response } = useFetch(
    `${KGB_API_URL}/timestamp/monthly/${selectedMonth}`
  );

  const data = response?.data.data;

  if (!data) {
    <div>Loading...</div>;
  }

  return (
    <>
      <Select
        onChange={(value) => setSelectedMonth(value?.value as Month)}
        className="Select"
        defaultValue={monthsOptions[today.getMonth()]}
        options={monthsOptions}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={getChartOptions(
          Object.keys(Month).indexOf(selectedMonth),
          today.getFullYear(),
          data,
          `${selectedMonth} hours`,
          '',
          'Day',
          'Number of Hours'
        )}
      />
    </>
  );
};

export default Home;
