import * as yup from 'yup';
import moment from 'moment';
import { convertDate } from '../../../shared/helpers/dateHelpers';

export const validationSchema = yup.object().shape({
  name: yup.string().required('Введите название'),
  description: yup.string().required('Введите описание'),
  endDate: yup.string().when(['$publish', '$edit'], {
    is: (publish: boolean, edit: boolean) => publish || edit,
    then: yup
      .string()
      .required('Выберите дату окончания')
      .test('check-date', 'Выбрана некорректная дата', (date) => {
        const convertedDate = convertDate(date ? date : new Date());
        const now = moment().format('DD.MM.YYYY');
        return now.localeCompare(convertedDate) < 0 && convertedDate.localeCompare(now) !== 0;
      }),
    otherwise: yup.string().notRequired(),
  }),
  groupId: yup.mixed().required('Не выбрана ни одна группа'),
});
