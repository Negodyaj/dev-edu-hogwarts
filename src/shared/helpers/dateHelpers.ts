import moment, { unitOfTime } from 'moment';

export const isSameDateOrAfter = (
  dateToCheck: moment.Moment,
  unit: unitOfTime.DurationConstructor,
  count: number
): boolean => {
  const dateBefore = moment().startOf('day').subtract(count, unit);
  return dateToCheck >= dateBefore;
};
