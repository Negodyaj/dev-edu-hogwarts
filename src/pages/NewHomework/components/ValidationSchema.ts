import * as yup from 'yup';
import moment from 'moment';
import { convertDate } from '../../../shared/helpers/dateHelpers';

export const validationSchema = yup.object().shape({
  name: yup.string().required('Введите название'),
  description: yup.string().required('Введите описание'),
  endDate: yup.string().when('$publish', {
    is: true,
    then: yup
      .string()
      .required('Выберите дату окончания')
      .test(
        'check-date',
        'Выбрана некорректная дата',
        (date) =>
          moment(new Date(), 'DD.MM.YYYY').toString() !==
          convertDate(date ? date : new Date().toString())
      ),
    otherwise: yup.string().notRequired(),
  }),
  groupId: yup.mixed().required('Не выбрана ни одна группа'),
});
