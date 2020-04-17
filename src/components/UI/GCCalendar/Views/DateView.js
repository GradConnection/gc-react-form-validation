import React from "react";

import {
  dayShortNameArray,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthLength,
  getPrevMonth,
  getDateFromString,
} from "utils";

const DateView = ({ displayDate, valueDate, onDateClick, type = "picker" }) => {
  const getValueDate = (valueDate, type) => {
    if (type.startsWith("range")) {
      return [
        getDateFromString(valueDate.start),
        getDateFromString(valueDate.end),
      ];
    }

    return getDateFromString(valueDate);
  };

  const getSelectedDates = (date, type) => {
    if (Array.isArray(date)) {
      return date.map(d => {
        return displayDate.getMonth() === d.getMonth()
          ? d.getDate()
          : undefined;
      });
    }

    if (!date || !(date instanceof Date)) return undefined;

    return date.getDate();
  };

  const firstDayI = getFirstDayOfMonth(displayDate);
  const lastDayI = getLastDayOfMonth(displayDate);
  const monthLength = getMonthLength(displayDate);
  const prevMonth = getPrevMonth(displayDate);
  const prevMonthLength = getMonthLength(prevMonth);
  const extraDays = firstDayI + 6 - lastDayI;
  const numOfWeeks = (monthLength + extraDays) / 7;
  let counter = 1;
  const valueDateTested = getValueDate(valueDate, type);
  const selectedDate = getSelectedDates(valueDateTested, type);

  const onActiveDateClick = (e, day) => {
    if (type.startsWith("range")) {
      onDateClick(e, day, displayDate.getMonth(), displayDate.getFullYear());
    } else {
      onDateClick(e, day);
    }
  };

  const calcRows = rowI => {
    const cells = [];

    dayShortNameArray.forEach((d, cellI) => {
      if ((rowI === 0 && cellI < firstDayI) || counter > monthLength) {
        // prev and next month dates
        let date = 0;
        if (rowI === 0 && cellI < firstDayI) {
          date = prevMonthLength - firstDayI + cellI + 1;
        } else {
          date = cellI - lastDayI;
        }
        cells.push(
          <div
            className="gc-calendar__body__cell gc-calendar__body__cell--disabled"
            key={`${cellI}_${date}`}
          >
            {date}
          </div>
        );
      } else if (
        (rowI === 0 && cellI >= firstDayI) ||
        (rowI > 0 && counter <= monthLength)
      ) {
        // Current month dates
        const num = counter;
        let activeClass = "";
        const meh = new Date(valueDate);
        if (displayDate.getMonth() === meh.getMonth()) {
          if (
            (!Array.isArray(selectedDate) &&
              selectedDate &&
              num === selectedDate) ||
            (Array.isArray(selectedDate) && selectedDate.includes(num))
          ) {
            activeClass = "gc-calendar__body__cell--active";
          }
        }
        cells.push(
          <button
            className={`gc-calendar__body__cell gc-calendar__body__cell--btn ${activeClass}`}
            key={`${cellI}_${counter}`}
            onClick={e => onActiveDateClick(e, num)}
          >
            {counter}
          </button>
        );
        counter++;
      }
    });
    return cells;
  };

  const grid = [];
  for (let i = 0; i < numOfWeeks; i++) {
    grid.push(<div className="gc-calendar__body__row">{calcRows(i)}</div>);
  }

  const weekDays = (
    <div className="gc-calendar__body__row gc-calendar__body__row--weekdays">
      {dayShortNameArray.map(day => (
        <div className="gc-calendar__body__cell">{day[0]}</div>
      ))}
    </div>
  );

  return (
    <div className="gc-calendar__body">
      {weekDays}
      {grid}
    </div>
  );
};

export { DateView };
