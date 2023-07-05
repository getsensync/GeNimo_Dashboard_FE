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

// convert amount (number) to IDR currency
export const toFormatted = (number, isMoney = false) => {
  // if isMoney the number should be times 1000
  if (isMoney) {
    number = number * 1000;
  }
  const size = ["", "K", "M", "B", "T"];
  const sizeIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
  const scaledNumber = number / Math.pow(10, sizeIndex * 3);
  let result = scaledNumber;
  if (sizeIndex === 0 || (isMoney && sizeIndex === 1)) {
    result = scaledNumber.toFixed(0);
  } else {
    result = scaledNumber.toFixed(3).replace(".", ",");
  }
  return `${result}${size[sizeIndex]}`;
}