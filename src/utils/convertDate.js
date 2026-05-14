import jMoment from 'jalali-moment';

export const convertToDateToJalali = (date = null) => {
  const momentDate = date ? jMoment(date) : jMoment();
  return momentDate.format('jYYYY/jMM/jDD');
};
