import React from 'react';

import { monthNameArray } from 'utils';

const YearView = ({ selectedYear, onYearClick }) => {
  let counter = selectedYear - 5;
  const endYr = selectedYear + 6;
  const yearArray = [];
  while (counter < endYr) {
    yearArray.push(counter);
    counter += 1;
  }
  return (
    <div className="gc-calendar__body">
      {yearArray.map(yr => (
        <button
          className={`gc-calendar__body__cell gc-calendar__body__cell--btn gc-calendar__body__cell--month ${
            yr === selectedYear ? 'gc-calendar__body__cell--active' : ''
          }`}
          key={`year--${yr}`}
          onClick={e => onYearClick(e, yr)}
        >
          {yr}
        </button>
      ))}
    </div>
  );
};

export { YearView };
