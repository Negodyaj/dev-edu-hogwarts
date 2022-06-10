import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setIsEdit } from '../../actions/lessons.actions';
import { resetDataToCreate } from '../../actions/newLessonPage.action';
import { getLessonsInfo, updateLesson, uploadLesson } from '../../actions/newLessonPage.thunk';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import Datepicker from '../../components/Datepicker/Datepicker';
import { LinkWithUnderline } from '../../components/LinkWithUnderline/LinkWithUnderline';
import { RadioData } from '../../components/RadioGroup/RadioButton/RadioButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { UserRole } from '../../shared/enums/UserRole';
import { LessonsPageState } from '../../store/reducers/lessons.reducer';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { NewLessonPageState } from '../../store/reducers/newLessonPage.reducer';
import { AppState } from '../../store/store';
import './NewLessonPage.scss';
import { Input } from '../../components/styled/Input';
import { Textarea } from '../../components/styled/Textarea';
import { StyledValidationError } from '../../components/styled/StyledValidationError';

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

  const { lessonsData, message } = useSelector(
    (state: AppState) => state.newLessonPageState as NewLessonPageState
  );
  const { isEditing, selectedTab } = useSelector(
    (state: AppState) => state.lessonsPageState as LessonsPageState
  );
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const navigate = useNavigate();
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);

  const initFields = () => {
    if (id) {
      dispatch(getLessonsInfo(+id));
      dispatch(setIsEdit(true));
    } else {
      dispatch(resetDataToCreate());
      dispatch(setIsEdit(false));
    }
  };

  useEffect(() => {
    initFields();
  }, []);

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

  useEffect(() => {
    if (
      currentRole !== UserRole.Teacher &&
      currentRole !== UserRole.Admin &&
      currentRole !== UserRole.Tutor
    )
      navigate('/lessons', { replace: true });
    reset(lessonsData);
  }, [lessonsData]);

  const onPublishHandler = handleSubmit((data: NewLessonFormData) => {
    data.isPublished = true;
    if (!isEditing) dispatch(uploadLesson(data));
    else {
      data.id = +id!;
      dispatch(updateLesson(data));
      if (!message) navigate('/lessons', { replace: true });
    }
    dispatch(resetDataToCreate());
    reset();
    navigate('/lessons', { replace: true });
  });

  const onSaveHandler = handleSubmit((data: NewLessonFormData) => {
    data.isPublished = false;
    if (!isEditing) dispatch(uploadLesson(data));
    else {
      data.id = +id!;
      dispatch(updateLesson(data));
      if (!message) navigate('/new-lesson/unpublished', { replace: true });
    }
    dispatch(resetDataToCreate());
    reset();
    navigate(-1);
  });

  const onCancel = () => {
    if (id) navigate('/new-lesson/unpublished');
    reset();
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <form className="form-container homework-form">
        <div className="flex-between base-line">
          <h2 className="homework-form_title">{!isEditing ? 'Новое занятие' : 'Редактирование'}</h2>
          <LinkWithUnderline path="new-lesson/unpublished" text="Список сохраненных занятий" />
        </div>
        <div className="form-element flex-container">
          Номер группы:
          {isEditing ? (
            `   ${selectedTab}`
          ) : (
            <div className="radio-group-container flex-container">
              {currentUser?.groups && (
                <RadioGroup
                  radioData={currentUser.groups?.map((group) => {
                    return { text: group.name, value: group.id, key: group.id } as RadioData;
                  })}
                  name="groupId"
                  selected={selectedTab}
                />
              )}
            </div>
          )}
        </div>
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
          <Input
            customClassName={`${errors.name ? ' invalid-input' : ''}`}
            type="text"
            placeholder="Введите название"
            name="name"
            register={register}
            required={true}
          />
        </div>
        <StyledValidationError>{errors.name?.message}</StyledValidationError>
        <div className="form-element">
          Ссылка на видео
          <Input
            customClassName={`${errors.linkToRecord ? ' invalid-input' : ''}`}
            type="text"
            name="linkToRecord"
            register={register}
            rules={{
              required: 'Поле обязательно к заполнению',
              pattern: {
                value:
                  /^((ftp|http|https):\/\/)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
                message: 'Некорректная ссылка',
              },
            }}
            placeholder="Ссылка на видео"
          />
        </div>
        <StyledValidationError>{errors.linkToRecord?.message}</StyledValidationError>
        <div className="form-element">
          Дополнительные материалы
          <Textarea
            customClassName={`${errors.additionalMaterials ? ' invalid-input' : ''}`}
            placeholder="Введите текст"
            register={register}
            name="additionalMaterials"
            rules={{ required: 'Поле обязательно к заполнению' }}
          />
          <StyledValidationError>{errors.additionalMaterials?.message}</StyledValidationError>
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
            onClick={onCancel}
          />
        </div>
      </form>
    </FormProvider>
  );
};
