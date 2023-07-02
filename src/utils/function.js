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