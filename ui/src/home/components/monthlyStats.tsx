import './monthlyStats.css';
import React from 'react';
import { Month } from '../types';
import { TimeSeriesResponse } from '../../types';

interface MonthlyStatsProps {
  monthSelected: Month;
  data: TimeSeriesResponse[];
}

const MonthlyStats: React.FC<MonthlyStatsProps> = ({ monthSelected, data }) => {
  const orderedUsersData = data.sort((a, b) =>
    a.monthly < b.monthly ? 1 : -1
  );

  console.log(orderedUsersData);
  return (
    <>
      <div className="MonthlyStatesWrapper">
        <div className="Header">Total stats for {monthSelected} </div>
        <ol className="List">
          {orderedUsersData
            .filter((data) => data.monthly > 0.01)
            .map((user) => {
              return (
                <li className="Individuals">
                  {user.name} -{' '}
                  <span className="Hours">
                    {user.monthly.toFixed(1)} hours{' '}
                  </span>
                </li>
              );
            })}
        </ol>
      </div>
    </>
  );
};

export default MonthlyStats;
