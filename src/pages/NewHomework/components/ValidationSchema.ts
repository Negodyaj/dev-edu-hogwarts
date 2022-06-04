import * as yup from 'yup';
import moment from 'moment';

export const validationSchema = yup.object().shape({
  name: yup.string().required('Введите название'),
  description: yup.string().required('Введите описание'),
  startDate: yup
    .string()
    .when('$publish', {
      is: true,
      then: yup.string().test('check-date', 'Выбрана некорректная дата', (date) => {
        const now = moment().utc();
        return (
          moment(date && date.length > 0 ? date : new Date()).isSameOrAfter(now, 'day') &&
          moment(date && date.length > 0 ? date : new Date()).isSameOrAfter(now, 'month')
        );
      }),
    })
    .when(['$edit', '$start', '$end'], {
      is: (edit: boolean, start?: string, end?: string) => edit && start && end,
      then: yup.string().test('check-date-edit', 'Выбрана некорректная дата', (date, value) => {
        debugger;
        const dayOf = moment(value.options.context?.start, 'DD.MM.YYYY').subtract(1, 'days');
        return (
          moment(date).isSameOrAfter(dayOf, 'day') && moment(date).isSameOrAfter(dayOf, 'month')
        );
      }),
    }),
  endDate: yup
    .string()
    .when('$publish', {
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
    })
    .when(['$edit', '$start', '$end'], {
      is: (edit: boolean, start?: string, end?: string) => edit && start && end,
      then: yup.string().test('check-date-edit', 'Выбрана некорректная дата', (date, value) => {
        debugger;
        const dayOf = moment(value.options.context?.start, 'DD.MM.YYYY');
        return moment(date).isAfter(dayOf);
      }),
    }),
  groupId: yup.mixed().required('Не выбрана ни одна группа'),
});
