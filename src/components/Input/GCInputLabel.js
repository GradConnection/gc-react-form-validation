import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';

import ReactHtmlParser from 'react-html-parser';

import { GCIcon } from './GCIcons';

export default function GCInputLabel({
  title,
  required,
  name,
  value,
  type,
  hidden,
  exception,
  children,
  hasTooltip,
  toggleTooltip,
  toolTipActive
}) {
  const inlineClass = isEmpty(value) ? 'gc-input__label--inline' : '';
  const requiredClass = required ? 'gc-input__label--required' : '';
  const selectClass = exception === 'select' ? 'gc-select__label' : '';
  const floatingLabel =
    type !== 'radio' &&
    type !== 'date' &&
    type !== 'range' &&
    type !== 'select' &&
    type !== 'textarea' &&
    type !== 'checkbox';
  const staticLabel =
    type === 'date' || type === 'range' || type === 'textarea';
  if (!isEmpty(title) && type !== 'select' && !hidden) {
    if (staticLabel) {
      return (
        <Fragment>
          <label
            className={`gc-input__label ${requiredClass} ${selectClass}`}
            htmlFor={name}
          >
            {ReactHtmlParser(title)}
          </label>
          {hasTooltip && (
            <span
              className="gctooltip__icon"
              role="button"
              onClick={() => toggleTooltip(!toolTipActive)}
            >
              <GCIcon
                size="30px"
                kind="infoIcon"
                iconTitle="tooltip"
                mainFill="#777"
              />
            </span>
          )}
          {children}
        </Fragment>
      );
    } else if (floatingLabel) {
      return (
        <Fragment>
          {children}
          <label
            className={`gc-input__label ${inlineClass} ${requiredClass}`}
            htmlFor={name}
          >
            {ReactHtmlParser(title)}
          </label>
          {hasTooltip && (
            <span
              className="gctooltip__icon"
              role="button"
              onClick={() => toggleTooltip(!toolTipActive)}
            >
              <GCIcon
                size="30px"
                kind="infoIcon"
                iconTitle="tooltip"
                mainFill="#777"
              />
            </span>
          )}
        </Fragment>
      );
    } else if (type === 'checkbox') {
      return (
        <Fragment>
          <label
            className={`gc-input__label gc-input__label--checkbox ${
              requiredClass
            } ${selectClass}`}
            htmlFor={name}
          >
            {ReactHtmlParser(title)}
          </label>
          {children}
        </Fragment>
      );
    }
  } else if (hidden) {
    return null;
  }
  return children;
}
