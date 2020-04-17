import React from "react";
import { GCIcon } from "ui";

const CalendarHeader = ({ month, year, onHeaderBtnClick }) => (
  <h6 className="gc-calendar__header">
    <button
      type="button"
      className="gc-calendar__header__btn"
      onClick={() => onHeaderBtnClick("month")}
      style={{ marginRight: "5px" }}
    >
      {month} <GCIcon kind="chevronIcon" />
    </button>
    <button
      type="button"
      className="gc-calendar__header__btn"
      onClick={() => onHeaderBtnClick("year")}
    >
      {year} <GCIcon kind="chevronIcon" />
    </button>
  </h6>
);

export { CalendarHeader };
