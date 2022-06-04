import moment from 'moment';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import Datepicker from '../../components/Datepicker/Datepicker';
import { LinkWithUnderline } from '../../components/LinkWithUnderline/LinkWithUnderline';
import { RadioData } from '../../components/RadioGroup/RadioButton/RadioButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { AppState } from '../../store/store';

export type NewLessonFormData = {
  date: string | Date;
  additionalMaterials: string;
  groupId?: number;
  name: string;
  linkToRecord: string;
  // isPublished: boolean;
};

export const NewLessonPage = () => {
  const methods = useForm<NewLessonFormData>({
    defaultValues: {
      date: `${moment().format('DD.MM.YYYY')}`,
      additionalMaterials: '',
      groupId: -1,
      name: '',
      linkToRecord: '',
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = methods;

  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const navigate = useNavigate();
  const onSubmit = () => {
    alert('SUBMIT!');
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form className="form-container homework-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-between">
          <h2 className="homework-form_title">Новое занятие</h2>
          <LinkWithUnderline path="aaa" text="Список сохраненных занятий"></LinkWithUnderline>
        </div>
        <div className="form-element flex-container">
          Номер группы:
          <div className="radio-group-container flex-container">
            {currentUser?.groups && (
              <RadioGroup
                radioData={currentUser.groups?.map((group) => {
                  return { text: group.course?.name, value: group.id } as RadioData;
                })}
                name="groupId"
              />
            )}
          </div>
        </div>
        <span className="invalid-feedback">{errors?.groupId?.message}</span>
        <div>
          Дата проведения занятия
          <Controller
            name="date"
            control={control}
            defaultValue={`${moment().format('DD.MM.YYYY')}`}
            rules={{ required: false }}
            render={({ field }) => <Datepicker field={field} />}
          />
        </div>
        <div className="form-element">
          Название занятия
          <input
            className={`form-input${errors.name ? ' invalid-input' : ''}`}
            type="text"
            placeholder="Введите название"
            {...register('name', { required: true })}
          />
        </div>
        <div className="invalid-feedback">{errors.date?.message}</div>
        <div className="form-element">
          Ссылка на видео
          <input
            className={`form-input${errors.linkToRecord ? ' invalid-input' : ''}`}
            type="text"
            placeholder="Ссылка на видео"
            {...register('linkToRecord', { required: true })}
          />
        </div>
        <div className="form-element">
          Дополнительные материалы
          <textarea
            className={`form-input${errors.additionalMaterials ? ' invalid-input' : ''}`}
            placeholder="Введите текст"
            {...register('additionalMaterials', { required: true })}
          />
        </div>
        <div className="buttons-group">
          <Button
            text="Опубликовать"
            model={ButtonModel.Colored}
            type={ButtonType.submit}
            disabled={true}
            onClick={() => {}}
          />
          <Button
            text={'Сохранить'}
            model={ButtonModel.White}
            type={ButtonType.submit}
            disabled={true}
            onClick={() => {}}
          />
          <Button
            text="Отмена"
            type={ButtonType.reset}
            model={ButtonModel.Text}
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </FormProvider>
  );
};
