export const formatDate = (date: string): Date => {
  const [day, month, year] = date.split('/');
  const newDate = `${year}-${month}-${day}`;
  return new Date(newDate);
};
