export const dateToString = (date) => {
  return date.toString().slice(0, 10) + " > " + date.slice(11, 16);
};

export const dateToDateString = (date) => {
  return date.toString().slice(0, 10);
}