import { Controller, FormProvider, useForm } from 'react-hook-form';
import './NewHomework.scss';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import Datepicker from '../../components/Datepicker/Datepicker';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { Icon } from '../../shared/enums/Icon';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import {
  addLink,
  selectCourse,
  selectGroup,
  setValueInInput,
} from '../../actions/newHomeworkForm.action';
import { AddedLink } from './components/AddedLink';
import { Homework, Task } from '../../models/responses/HomeworksResponse';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import {
  createNewHomework,
  getCourses,
  tasksCountInGroup,
  updateHomework,
  updateTask,
} from '../../actions/homeworks.thunks';
import { UserRole } from '../../shared/enums/UserRole';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { validationSchema } from './components/ValidationSchema';
import {
  createHomeworkFromData,
  fixHomeworkFormData,
  resetForm,
  returnFunctionByRole,
  validateLinkPath,
} from '../../shared/helpers/homeworkFormHelper';
import { loadHomeworkSuccess } from '../../actions/homework.actions';
import {
  getHomeworkToDelete,
  getTaskToDelete,
  setWindowState,
  setWindowType,
} from '../../actions/modalWindow.actions';
import { ModalType } from '../../shared/enums/modalType';
import { CheckboxGroup } from '../../components/CheckBoxGroup/CheckBoxGroup';
import { CheckboxData } from '../../components/CheckBoxGroup/CheckBox/CheckBox';
import { CoursesPageState } from '../../store/reducers/courses.reducer';
import { Input } from '../../components/styled/Input';
import { Textarea } from '../../components/styled/Textarea';

export type AddHomeworkFormData = {
  startDate: string | Date;
  endDate: string | Date;
  name: string;
  description: string;
  links: string;
  groupId?: number;
  courseIds?: number[];
  mode: string;
};

type HomeworkFormProps = {
  initialTask?: Task;
  initialHomework?: Homework;
  selectedGroup?: number;
};

export const NewHomework = ({ initialTask, initialHomework, selectedGroup }: HomeworkFormProps) => {
  const [isPublish, setIsPublish] = useState(true);
  const isEdit = location.pathname.includes('edit');

  const {
    links,
    inputLinkValue,
    group,
    selectGroupId,
    errorMessage,
    inProcess,
    selectedTaskCount,
  } = useSelector((state: AppState) => state.newHomeworkFormState);
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { courses } = useSelector((state: AppState) => state.coursesPageState as CoursesPageState);
  const refLinkName = useRef<any>({});
  const [linkValue, setLinkValue] = useState<string | undefined>(undefined);

  const method = useForm<AddHomeworkFormData>({
    resolver: yupResolver(validationSchema),
    context: {
      publish: isPublish,
      role: currentRole,
      edit: !!initialHomework,
      start: initialHomework?.startDate,
      end: initialHomework?.endDate,
    },
    defaultValues: {
      startDate: initialHomework?.startDate
        ? moment(initialHomework?.startDate, 'DD.MM.YYYY').toDate()
        : '',
      endDate: initialHomework?.endDate
        ? moment(initialHomework?.endDate, 'DD.MM.YYYY').toDate()
        : '',
      name: initialTask?.name ?? initialHomework?.task.name ?? '',
      description: initialTask?.description ?? initialHomework?.task.description ?? '',
      groupId: initialTask?.groupId ?? selectedGroup ?? initialHomework?.task.groupId ?? undefined,
      courseIds: initialTask?.courseIds ?? [],
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const coursesData = courses?.map((crs) => {
    const courseData: CheckboxData = {
      value: crs.id,
      text: `${crs.name}`,
      isChecked: false,
    };
    return courseData;
  });

  const memoizeMapLinks = useMemo(() => {
    return links.map((item, index) => {
      return item !== '' && <AddedLink key={index} itemNumber={index} source={item} />;
    });
  }, [links]);

  const addLinkInForm = (value?: string) =>
    validateLinkPath(inputLinkValue, links, value)
      ? setLinkValue(undefined)
      : setLinkValue('Введите корректную ссылку');

  const createNewHandleSubmit = (data: AddHomeworkFormData) => {
    const formData = fixHomeworkFormData(data, links);
    debugger;
    if (isPublish) {
      dispatch(createNewHomework(formData));
    } else {
      const roleFunction = returnFunctionByRole(currentRole);
      dispatch(roleFunction(formData, links));
    }

    if (!errorMessage) {
      resetForm(links, dispatch, method);
    }
  };

  const editExistHandleSubmit = (data: AddHomeworkFormData) => {
    const formData = fixHomeworkFormData(data, links);
    debugger;
    if (isPublish) {
      dispatch(createNewHomework(formData));
    } else {
      if (initialHomework) {
        dispatch(updateHomework(initialHomework?.id ?? -1, formData));
        dispatch(loadHomeworkSuccess(createHomeworkFromData(initialHomework, formData)));
      }
    }
    dispatch(updateTask(initialHomework?.task.id ?? initialTask?.id ?? -1, formData));
  };

  const getId = (id: number) => {
    if (currentRole === UserRole.Teacher) {
      dispatch(selectGroup(id));
    } else {
      dispatch(selectCourse(id));
    }
  };

  useEffect(() => {
    if (currentRole === UserRole.Methodist) {
      dispatch(getCourses());
    }
    if (initialTask) {
      const linksInResp = initialTask?.links.split(' [link] ');
      linksInResp.forEach((link) => dispatch(addLink(link)));
    } else if (initialHomework) {
      const linksInResp = initialHomework?.task.links.split(' [link] ');
      linksInResp.forEach((link) => dispatch(addLink(link)));
    }
    return () => {
      resetForm(links, dispatch, method);
    };
  }, []);

  useEffect(() => {
    const id = method.getValues('groupId');
    if (currentRole === UserRole.Teacher) {
      dispatch(tasksCountInGroup(id ? id : selectGroupId !== -1 ? selectGroupId : -1));
    }
  }, [selectGroupId]);

  return (
    <FormProvider {...method}>
      <form
        className="form-container homework-form"
        onSubmit={method.handleSubmit(isEdit ? editExistHandleSubmit : createNewHandleSubmit)}
      >
        <h2 className="homework-form_title">
          {isEdit ? 'Редактировать задание' : 'Новое задание'}
        </h2>

        <div className="form-element flex-container">
          <div className="title-number-groups">
            {currentRole === UserRole.Methodist ? 'Номер курса:' : 'Номер группы'}
          </div>
          <div className="radio-group-container flex-container">
            {currentRole === UserRole.Teacher ? (
              <RadioGroup
                radioData={currentRole === UserRole.Teacher ? group : []}
                name="groupId"
                callback={getId}
                selected={
                  currentRole === UserRole.Teacher
                    ? selectedGroup ?? initialTask?.groupId ?? initialHomework?.group.id
                    : undefined
                }
              />
            ) : (
              <CheckboxGroup checkboxArr={coursesData as CheckboxData[]} name="courseIds" />
            )}
          </div>
        </div>
        <span className="invalid-feedback">{method.formState.errors.groupId?.message}</span>

        {currentRole !== UserRole.Methodist && (
          <div className="form-element">
            Номер задания:
            {isEdit ? (
              <input
                type="number"
                className="homework-form_task list-view-input"
                value={initialHomework?.number ?? selectedTaskCount <= 0 ? '1' : selectedTaskCount}
              />
            ) : (
              <span className="homework-form_task">
                {initialHomework?.number ?? selectedTaskCount <= 0 ? '1' : selectedTaskCount}
              </span>
            )}
          </div>
        )}

        {currentRole === UserRole.Teacher && (
          <div className="homework-form_dates form-grid-container">
            <div>
              Дата выдачи задания
              <Controller
                name="startDate"
                control={method.control}
                render={({ field }) => <Datepicker field={field} />}
              />
              <div className="invalid-feedback">{method.formState.errors.startDate?.message}</div>
            </div>
            <div>
              Срок сдачи задания
              <Controller
                name="endDate"
                control={method.control}
                rules={{ required: isPublish }}
                render={({ field }) => <Datepicker field={field} />}
              />
              <div className="invalid-feedback">{method.formState.errors.endDate?.message}</div>
            </div>
          </div>
        )}

        <div className="form-element">
          Название задания
          <Input
            name="name"
            type="text"
            register={method.register}
            placeholder="Введите название"
          />
        </div>
        <div className="invalid-feedback">{method.formState.errors.name?.message}</div>

        <div className="form-element">
          Описание задания
          <Textarea
            register={method.register}
            name="description"
            rules={{ required: true }}
            customClassName={`${method.formState.errors.description ? ' invalid-input' : ''}`}
            placeholder="Введите текст"
          />
        </div>
        <div className="invalid-feedback">{method.formState.errors.description?.message}</div>

        <div className="form-element">
          Полезные ссылки
          {links.length > 0 && memoizeMapLinks}
          <div className="form-input_link__container">
            <textarea
              className={`form-input_link form-input${linkValue ? ' invalid-input' : ''}`}
              ref={refLinkName}
              value={inputLinkValue}
              onInput={(event) => {
                const value = (event.target as HTMLTextAreaElement).value;
                dispatch(setValueInInput(value));
                addLinkInForm(value);
              }}
              onPaste={(event) => {
                const value = event.clipboardData.getData('Text');
                dispatch(setValueInInput(value));
                event.preventDefault();
              }}
              placeholder="Вставьте ссылку"
            />
            <Button
              icon={Icon.Plus}
              type={ButtonType.button}
              onClick={() => {
                if (inputLinkValue?.length > 0 && !linkValue) {
                  dispatch(addLink(refLinkName.current.value));
                }
              }}
              model={ButtonModel.EllipseColored}
            />
          </div>
        </div>
        {linkValue && <div className="invalid-feedback">{linkValue}</div>}

        <div className="buttons-group">
          {currentRole === UserRole.Teacher && !initialHomework && (
            <Button
              text="Опубликовать"
              model={ButtonModel.Colored}
              type={ButtonType.submit}
              disabled={inProcess || !!linkValue}
              onClick={() => setIsPublish(true)}
            />
          )}
          <Button
            text={
              isEdit || currentRole === UserRole.Methodist ? 'Сохранить' : 'Сохранить как черновик'
            }
            model={ButtonModel.White}
            type={ButtonType.submit}
            disabled={inProcess || !!linkValue}
            onClick={() => setIsPublish(false)}
          />
          <Button
            text="Отмена"
            type={ButtonType.reset}
            model={ButtonModel.Text}
            onClick={() => navigate(-1)}
          />
          {isEdit && (
            <div className="flex-container delete-button">
              <Button
                text="Удалить задание"
                type={ButtonType.button}
                model={ButtonModel.Text}
                onClick={() => {
                  dispatch(setWindowType(ModalType.deleteHomework));
                  dispatch(setWindowState(true));
                  if (initialHomework) {
                    dispatch(getHomeworkToDelete(initialHomework));
                  }
                  if (initialTask) {
                    dispatch(getTaskToDelete(initialTask));
                  }
                }}
              />
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
