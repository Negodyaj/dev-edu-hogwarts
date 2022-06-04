import 'moment-timezone';
import moment, { unitOfTime } from 'moment';

export const isSameDateOrAfter = (
  dateToCheck: moment.Moment,
  unit: unitOfTime.DurationConstructor,
  count: number
): boolean => {
  const dateBefore = moment().startOf('day').subtract(count, unit);
  return dateToCheck >= dateBefore;
};

export const convertDate = (date: string | Date) => {
  return moment.tz(date, 'Europe/Moscow').format('DD.MM.YYYY').toString();
};
