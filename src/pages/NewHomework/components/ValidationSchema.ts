import * as yup from 'yup';
import moment from 'moment';

export const validationSchema = yup.object().shape({
  name: yup.string().required('Введите название'),
  description: yup.string().required('Введите описание'),
  startDate: yup.string().when('$publish', {
    is: true,
    then: yup.string().test('check-date', 'Выбрана некорректная дата', (date) => {
      const now = moment().utc();
      return (
        moment(date && date.length > 0 ? date : new Date()).isSameOrAfter(now, 'day') &&
        moment(date && date.length > 0 ? date : new Date()).isSameOrAfter(now, 'month')
      );
    }),
  }),
  endDate: yup.string().when('$publish', {
    is: true,
    then: yup
      .string()
      .required('Выберите дату окончания')
      .test('check-date', 'Выбрана некорректная дата', (date) => {
        const convertedDate = moment(date && date.length > 0 ? date : new Date());
        const now = moment().utc();
        return convertedDate.isAfter(now);
      }),
    otherwise: yup.string().notRequired(),
  }),
  groupId: yup.mixed().required('Не выбрана ни одна группа'),
});
