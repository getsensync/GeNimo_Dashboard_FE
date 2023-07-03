import { daysNumber, monthNumber } from "./data";

export const toFullString = (date) => {
  const asDate = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', };
  return asDate.toLocaleDateString('en-GB', options);
};

export const toDateString = (date) => {
  const asDate = new Date(date);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', };
  return asDate.toLocaleDateString('en-GB', options);
}

export const completeMonthInYear = (monthResponse) => {
  const completeMonth = monthNumber.map((month) => {
    const monthSale = monthResponse.findIndex((sale) => sale.month === month);
    if (monthSale !== -1) {
      return monthResponse[monthSale];
    } else {
      // return {month: month, count: 0};
      return {month: month, count: Math.floor(Math.random() * 30) + 1};
    }
  });
  return completeMonth;
};

export const completeDayInMonth = (dayResponse, onMonth) => {
  const monthWith30Days = ['4', '6', '9', '11'];
  const monthWith28Days = ['2'];
  // check if the onMonth is in the monthWith31Days
  let monthType = 31;
  if (monthWith30Days.includes(onMonth)) {
    monthType = 30;
  } else if (monthWith28Days.includes(onMonth)) {
    monthType = 28;
  }
  const completeDay = daysNumber.slice(0,monthType).map((day) => {
    const daySale = dayResponse.findIndex((sale) => sale.day === day);
    if (daySale !== -1) {
      return dayResponse[daySale];
    } else {
      return {day: day, count: Math.floor(Math.random() * 30) + 1};
    }
  });
  return completeDay;
};