import React, { Fragment } from "react";

import { GCIcon } from "ui";

const CalendarControls = ({
  onRightArrowBtnClick,
  onLeftArrowBtnClick,
  view,
  children,
}) => (
  <>
    {view !== "month" && (
      <button
        className="gc-calendar__controls__btn gc-calendar__controls__btn--left"
        onClick={onLeftArrowBtnClick}
      >
        <GCIcon kind="chevronIcon" />
      </button>
    )}
    <div className="gc-calendar__content--wrapper">{children}</div>
    {view !== "month" && (
      <button
        className="gc-calendar__controls__btn"
        onClick={onRightArrowBtnClick}
      >
        <GCIcon kind="chevronIcon" />
      </button>
    )}
  </>
);

export { CalendarControls };
