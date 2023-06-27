export const dateToString = (date) => {
  return date.toString().slice(0, 10) + " at " + date.slice(11, 19);
};

export const dateToDateString = (date) => {
  return date.toString().slice(0, 10);
}

export const dateToDateStringSlash = (date) => {
  return date.toString().slice(0, 10).replace(/-/g, "/");
}