import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setIsEdit } from '../../actions/lessons.actions';
import { getDataToEdit, resetDataToCreate } from '../../actions/newLessonPage.action';
import { updateLesson, uploadLesson } from '../../actions/newLessonPage.thunk';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import Datepicker from '../../components/Datepicker/Datepicker';
import { LinkWithUnderline } from '../../components/LinkWithUnderline/LinkWithUnderline';
import { RadioData } from '../../components/RadioGroup/RadioButton/RadioButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { LessonFullInfoResponse } from '../../models/responses/LessonResponse';
import { baseWretch } from '../../services/base-wretch.service';
import { getUrlLessonsFullInfo } from '../../shared/consts';
import { LessonsPageState } from '../../store/reducers/lessons.reducer';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { NewLessonPageState } from '../../store/reducers/newLessonPage.reducer';
import { AppState } from '../../store/store';
import './NewLessonPage.scss';

export type NewLessonFormData = {
  id?: number;
  date: string | Date;
  additionalMaterials: string;
  groupId?: number;
  name: string;
  linkToRecord: string;
  isPublished: boolean;
};

export const NewLessonPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { lessonsData } = useSelector(
    (state: AppState) => state.newLessonPageState as NewLessonPageState
  );
  const { isEditing, selectedTab } = useSelector(
    (state: AppState) => state.lessonsPageState as LessonsPageState
  );

  const methods = useForm<NewLessonFormData>({
    defaultValues: lessonsData,
  });

  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = methods;

  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const navigate = useNavigate();

  const initFields = async () => {
    if (id) {
      const fullLessonsData: LessonFullInfoResponse = await baseWretch()
        .url(getUrlLessonsFullInfo(+id))
        .get()
        .json();

      const lessonsFormData: NewLessonFormData = {
        id: fullLessonsData.id,
        date: fullLessonsData.date,
        additionalMaterials: fullLessonsData.additionalMaterials,
        isPublished: false,
        linkToRecord: fullLessonsData.linkToRecord,
        name: fullLessonsData.name,
        groupId: selectedTab,
      };

      dispatch(getDataToEdit(lessonsFormData));
      dispatch(setIsEdit(true));
    }
  };

  useEffect(() => {
    if (id) initFields();
    else {
      dispatch(resetDataToCreate());
      dispatch(setIsEdit(false));
    }
  }, [location.pathname]);

  const onPublishHandler = handleSubmit((data: NewLessonFormData) => {
    data.isPublished = true;
    if (!isEditing) dispatch(uploadLesson(data));
    else {
      data.id = +id!;
      dispatch(updateLesson(data));
    }
    dispatch(resetDataToCreate());
    reset();
  });

  const onSaveHandler = handleSubmit((data: NewLessonFormData) => {
    data.isPublished = false;
    if (!isEditing) dispatch(uploadLesson(data));
    else {
      data.id = +id!;
      dispatch(updateLesson(data));
    }
    dispatch(resetDataToCreate());
    reset();
  });

  return (
    <FormProvider {...methods}>
      <form className="form-container homework-form">
        <div className="flex-between base-line">
          <h2 className="homework-form_title">
            {!isEditing ? `${'Новое занятие'}` : `${'Редактирование'}`}
          </h2>
          <LinkWithUnderline
            path="new-lesson/unpublished"
            text="Список сохраненных занятий"
          ></LinkWithUnderline>
        </div>
        <div className="form-element flex-container">
          Номер группы:
          {isEditing ? (
            ` ${selectedTab}`
          ) : (
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
          )}
        </div>
        <span className="invalid-feedback">{errors?.groupId?.message}</span>
        <div className="form-element">
          Дата проведения занятия
          <Controller
            name="date"
            control={control}
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
            onClick={onPublishHandler}
          />
          <Button
            text={'Сохранить'}
            model={ButtonModel.White}
            type={ButtonType.submit}
            disabled={false}
            onClick={onSaveHandler}
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
