import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Datepicker from '../../components/Datepicker/Datepicker';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { UserRole } from '../../shared/enums/UserRole';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { AppState } from '../../store/store';

export type NewLessonFormData = {
  groupId: number;
  startDate: string | Date;
  name: string;
  videoLink: string;
  additionals: string;
};

export const NewLessonPage = () => {
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);

  const method = useForm<NewLessonFormData>({
    context: {
      
    }
  })
  return (
    <FormProvider {...method}>
      <form className="form-container" onSubmit={() => {}}>
        <div className="flex-between">
          <h2 className="">Новое занятие</h2>
          <Link to={''}>Список сохраненных занятий</Link>
        </div>
        <div className="form-element flex-container">
          Номер группы:
          <div className="radio-group-container flex-container">
            <RadioGroup
              radioData={currentRole === UserRole.Methodist ? course : group}
              name="groupId"
              callback={getId}
              selected={currentRole === UserRole.Teacher ? selectedGroup : undefined}
            />
          </div>
        </div>
        <span className="invalid-feedback">{method.formState.errors.groupId?.message}</span>
        <div>
          Дата проведения занятия
          <Datepicker field={field} />
          <div className="invalid-feedback">{method.formState.errors.startDate?.message}</div>
        </div>
        <div className="form-element">
          Название занятия
          <input
            className={`form-input${method.formState.errors.name ? ' invalid-input' : ''}`}
            type="text"
            placeholder="Введите название"
            {...method.register('name', { required: true })}
          />
        </div>
        <div className="form-element">
          Ссылка на видео
          <input
            className={`form-input${method.formState.errors.name ? ' invalid-input' : ''}`}
            type="text"
            placeholder="Ссылка на видео"
            {...method.register('name', { required: true })}
          />
        </div>
        <div className="form-element">
          Дополнительные материалы
          <textarea
            className={`form-input${method.formState.errors.description ? ' invalid-input' : ''}`}
            placeholder="Введите текст"
            {...method.register('description', { required: true })}
          />
        </div>
      </form>
    </FormProvider>
  );
};
