import jMoment from 'jalali-moment';

export const convertToDateToJalali = (date = null, format='jYYYY/jMM/jDD') => {
  const momentDate = date ? jMoment(date) : jMoment();
  return momentDate.format(format);
};


export const convertFormDateToMiladi = (date) => {
    return jMoment(date, 'jD / jM / jYYYY').format('YYYY-M-D')
}