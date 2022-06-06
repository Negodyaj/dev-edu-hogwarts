import moment from 'moment';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetDataToCreate } from '../../actions/newLessonPage.action';
import { uploadLesson } from '../../actions/newLessonPage.thunk';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import Datepicker from '../../components/Datepicker/Datepicker';
import { LinkWithUnderline } from '../../components/LinkWithUnderline/LinkWithUnderline';
import { RadioData } from '../../components/RadioGroup/RadioButton/RadioButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { NewLessonPageState } from '../../store/reducers/newLessonPage.reducer';
import { AppState } from '../../store/store';
import './NewLessonPage.scss';

export type NewLessonFormData = {
  date: string | Date;
  additionalMaterials: string;
  groupId?: number;
  name: string;
  linkToRecord: string;
  isPublished: boolean;
};

export const NewLessonPage = () => {
  const dispatch = useDispatch();
  const { lessonsData } = useSelector(
    (state: AppState) => state.lessonsPageState as NewLessonPageState
  );
  const methods = useForm<NewLessonFormData>({
    defaultValues: lessonsData,
  });

  const {
    register,
    formState: { errors },
    getValues,
    control,
    reset,
  } = methods;

  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const navigate = useNavigate();
  const onPublishHandler = (data: NewLessonFormData) => {
    data.isPublished = true;
    dispatch(uploadLesson(data));
    alert(`published ${data.groupId}!!`); //to delete
    dispatch(resetDataToCreate());
    reset();
  };
  const onSaveHandler = (data: NewLessonFormData) => {
    data.isPublished = false;
    dispatch(uploadLesson(data));
    alert(`saved to group ${data.groupId}!`); //to delete
    dispatch(resetDataToCreate());
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form className="form-container homework-form">
        <div className="flex-between base-line">
          <h2 className="homework-form_title">Новое занятие</h2>
          <LinkWithUnderline
            path="new-lesson/unpublished"
            text="Список сохраненных занятий"
          ></LinkWithUnderline>
        </div>
        <div className="form-element flex-container">
          Номер группы:
          <div className="radio-group-container flex-container">
            {currentUser?.groups && (
              <RadioGroup
                radioData={currentUser.groups?.map((group) => {
                  return { text: group.name, value: group.id } as RadioData;
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
            {...register('linkToRecord', { required: false })}
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
            disabled={false}
            onClick={() => {
              onPublishHandler(getValues());
            }}
          />
          <Button
            text={'Сохранить'}
            model={ButtonModel.White}
            type={ButtonType.submit}
            disabled={false}
            onClick={() => {
              onSaveHandler(getValues());
            }}
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
