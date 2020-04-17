/*
 * An attempt to get out of using lodash
 */
export const toArray = value => {
  if (!Array.isArray(value)) {
    if (value !== "") {
      if (value.includes(",")) {
        return value.split();
      }
      return [value];
    }
    return [];
  }
  return value;
};

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const isEmptyString = v => typeof v === "string" && !v.trim();

export const isEmpty = value =>
  isEmptyString(value) ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value !== "string" && JSON.stringify(value) === JSON.stringify({})) ||
  value === undefined ||
  value === null;

export const determineRenderType = type => {
  switch (type) {
    case "hidden":
    case "custom":
      return "hidden";
    case "name":
    case "text":
    case "url":
      return "text";
    default:
      return type;
  }
};

export const getLabel = (v, options) => {
  const obj = options.find(opt => opt.value === v);
  if (obj) {
    return obj.label;
  }
  return "";
};

export const removeOption = (v, options) => {
  return options.filter(opt => opt.value !== v);
};

export const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export const dayShortNameArray = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
];
export const monthNameArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getPrevMonth = dateC => {
  const date = new Date(dateC);
  const newMonth = ((date.getMonth() + 1) % 12) - 2;
  if (newMonth === 11) {
    const newYear = date.getFullYear() - 1;
    const newMonthDate = new Date(date.setMonth(newMonth));
    return new Date(newMonthDate.setYear(newYear));
  } else {
    return new Date(date.setMonth(newMonth));
  }
};

export const getNextMonth = dateC => {
  const date = new Date(dateC);
  const newMonth = (date.getMonth() + 1) % 12;
  if (newMonth === 0) {
    const newYear = date.getFullYear() + 1;
    const newMonthDate = new Date(date.setMonth(newMonth));
    return new Date(newMonthDate.setYear(newYear));
  } else {
    return new Date(date.setMonth(newMonth));
  }
};

export const getFirstDayOfMonth = date => new Date(date.setDate(1)).getDay();

export const getFirstDayOfMonthName = date =>
  dayShortNameArray[getFirstDayOfMonth(date)];

export const getLastDayOfMonth = date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

export const getMonthName = date => {
  const monthI = date.getMonth();
  return monthNameArray[monthI];
};

export const getMonthLength = date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getYear = date => date.getFullYear();

export const getDateFromString = dateString => {
  if (typeof dateString !== "string") return dateString;
  const date = new Date(dateString);
  // Differrent timezones issue fix
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  return date;
};
