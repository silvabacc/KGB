import './MonthlyStats.css';
import '../Home.css'
import React from 'react';
import { Month } from '../types';
import { TimeSeriesResponse } from '../../responseTypes';

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
        <ol className="List">
          {data.length ? (
            orderedUsersData
              .filter((data) => data.monthly > 0.01)
              .map((user) => {
                return (
                  <li className="Individuals">
                    {user.name} with {' '}
                      <span className="Hours">{user.monthly.toFixed(1)}</span>{' '}
                      hours{' '}
                  </li>
                );
              })
          ) : (
            <div className="Individuals">There are no stats for this month</div>
          )}
        </ol>
      </div>
    </>
  );
};

export default MonthlyStats;
