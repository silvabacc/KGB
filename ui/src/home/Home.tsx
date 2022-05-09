import './Home.css';
import React, { useState } from 'react';
import Select from 'react-select';
import { getChartOptions, monthsOptions } from './options';
import { Month } from './types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//Temporary number generator
const generateRandomNumbers = () => {
  let numbers: number[] = [];
  for (let i = 0; i < 28; i++) {
    numbers = [...numbers, Math.random() * 100];
  }
  return numbers;
};

const Home: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<Month>(Month.Jan);

  return (
    <>
      <Select
        onChange={(value) => setSelectedMonth(value?.value as Month)}
        className="Select"
        defaultValue={monthsOptions[0]}
        options={monthsOptions}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={getChartOptions(
          Object.keys(Month).indexOf(selectedMonth),
          //Dummy data
          //Fetch data from backend and transform into number[]
          [
            {
              name: 'khf',
              data: generateRandomNumbers()
            },
            {
              name: 'I am Mama',
              data: generateRandomNumbers()
            },
            {
              name: 'Snakerino',
              data: generateRandomNumbers()
            },
            {
              name: 'Qasiminator',
              data: generateRandomNumbers()
            },
            {
              name: 'Light',
              data: generateRandomNumbers()
            }
          ],
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
