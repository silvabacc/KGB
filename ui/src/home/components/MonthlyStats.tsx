import './MonthlyStats.css';
import '../Home.css';
import React from 'react';
import { Month } from '../types';
import { TimeSeriesResponse } from '../../responseTypes';
import { defaultColors } from './chartDefaultColors';

interface MonthlyStatsProps {
  monthSelected: Month;
  data: TimeSeriesResponse[];
}

const MonthlyStats: React.FC<MonthlyStatsProps> = ({ monthSelected, data }) => {
  const orderedUsersData = data.sort((a, b) =>
    a.monthly < b.monthly ? 1 : -1
  );

  return (
    <>
      <div className="Card MonthlyStatesWrapper">
        <div className="Header">Total stats for {monthSelected} </div>
        <ul className="List">
          {data.length ? (
            orderedUsersData
              .filter((data) => data.monthly > 0.01)
              .map((user, index) => {
                return (
                  <li className="Individuals">
                    <span style={{color: defaultColors[index], fontWeight: 700}}>{user.name}</span> with{' '}
                    <span className="Hours">{user.monthly.toFixed(1)}</span>{' '}
                    hours{' '}
                  </li>
                );
              })
          ) : (
            <div className="Individuals">There are no stats for this month</div>
          )}
        </ul>
      </div>
    </>
  );
};

export default MonthlyStats;
