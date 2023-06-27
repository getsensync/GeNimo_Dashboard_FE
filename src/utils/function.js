export const dateToString = (date) => {
  return date.slice(0, 10) + " at " + date.slice(11, 19);
};

export const dateToDateString = (date) => {
  return date.slice(0, 10);
}