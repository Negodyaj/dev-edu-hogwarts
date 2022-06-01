import { Controller, FormProvider, useForm } from 'react-hook-form';
import './NewHomework.scss';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import Datepicker from '../../components/Datepicker/Datepicker';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { baseWretch } from '../../services/base-wretch.service';
import {
  addNewTaskUrl,
  addNewTaskUrlByMethodist,
  getHomeworksByGroupId,
  updateTaskUrl,
} from '../../shared/consts';
import { SvgIcon } from '../../components/SvgIcon/SvgIcon';
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
  tasksCountInCourse,
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
import { Homework } from '../../models/responses/HomeworksResponse';
import { convertDate } from '../../shared/helpers/dateHelpers';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { UserRole } from '../../shared/enums/UserRole';
import { CheckboxData } from '../../components/CheckBoxGroup/CheckBox/CheckBox';
import { CheckboxGroup } from '../../components/CheckBoxGroup/CheckBoxGroup';
import { useLocation } from 'react-router-dom';
// import { setPrevURL } from '../../actions/homework.actions';
// import { CheckboxGroup } from '../../components/CheckBoxGroup/CheckBoxGroup';
// import { FilterList } from '../../components/FilterList/FilterList';
// import { CoursesPageState } from '../../store/reducers/courses.reducer';
// import { CoursesPageState } from '../../store/reducers/courses.reducer';

export type AddHomeworkFormData = {
  startDate: string | Date;
  endDate: string | Date;
  name: string;
  description: string;
  links: string;
  groupId?: number;
export interface AddTaskFormData extends UpdateTaskFormData {
  // name: string;
  // description: string;
  homework: {
    startDate: string;
    endDate: string;
  };
  groupId?: number;
  courseId?: number;
}
export type UpdateTaskFormData = {
  name: string;
  description: string;
};

type HomeworkFormProps = {
  initialTask?: Task;
  initialHomework?: Homework;
  selectedGroup?: number;
};

export const NewHomework = ({ initialTask, initialHomework, selectedGroup }: HomeworkFormProps) => {
  const [isPublish, setIsPublish] = useState(true);
  const isEdit = location.pathname.includes('edit');

  const method = useForm<AddHomeworkFormData>({
    resolver: yupResolver(validationSchema),
    context: {
      publish: isPublish,
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
      groupId: initialTask?.groupId ?? initialHomework?.task.groupId ?? undefined,
    },
  });
export const NewHomework = () => {
  const location = useLocation();
  console.log(location.key);
  const { prevPageURL, task } = useSelector((state: AppState) => state.homeworkPageState);
  const method = useForm<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    links,
    inputLinkValue,
    group,
    course,
    selectedTaskCount,
    selectGroupId,
    errorMessage,
    inProcess,
  } = useSelector((state: AppState) => state.newHomeworkFormState);
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { links, inputLinkValue, group, selectGroupId } = useSelector(
    (state: AppState) => state.newHomeworkFormState
  );
  const { courses } = useSelector((state: AppState) => state.coursesPageState);
  const refLinkName = useRef<any>({});
  const [linkValue, setLinkValue] = useState<string | undefined>(undefined);

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
  console.log(prevPageURL);
  const addLinkInForm = () => {
    if (inputLinkValue && /^[a-z]+:\/\//i.test(inputLinkValue) && !links.includes(inputLinkValue))
      dispatch(addLink(refLinkName.current.value));
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
  const onSubmitAddnewTask = (data: AddTaskFormData) => {
    debugger;
    const formData = {
      ...data,
      links: links.join(' [link] '),
      isRequired: true,
      homework: {
        startDate: convertDate(data.homework.startDate),
        endDate: convertDate(data.homework.endDate),
      },
    };
    if (currentRole === UserRole.Teacher) {
      baseWretch().url(addNewTaskUrl).post(formData);
    } else if (currentRole === UserRole.Methodist) {
      baseWretch().url(addNewTaskUrlByMethodist).post(formData);
    }
  };

  const getId = (id: number) => {
    if (currentRole === UserRole.Teacher) {
      dispatch(selectGroup(id));
    } else {
      dispatch(selectCourse(id));
    }
  const onSubmitUpdateTask = (data: UpdateTaskFormData) => {
    const formData = {
      ...data,
      links: links.join(' [link] '),
      isRequired: true,
    };
    if (task) baseWretch().url(updateTaskUrl(task.id)).put(formData);
  };
  const getGroupId = (groupId: number) => {
    console.log(groupId);
    dispatch(selectGroup(groupId));
  };
  const coursesData: CheckboxData[] | undefined = courses?.map((course) => {
    const courseData: CheckboxData = {
      value: course.id,
      text: `${course.name}`,
      isChecked: false,
    };
    return courseData;
  });

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
    } else if (currentRole === UserRole.Methodist && id) {
      dispatch(tasksCountInCourse(id));
    }
  }, [selectGroupId]);
  return (
    <FormProvider {...method}>
      <form
        className="form-container homework-form"
        onSubmit={method.handleSubmit(isEdit ? editExistHandleSubmit : createNewHandleSubmit)}
      >
        <h2 className="homework-form_title">Новое задание</h2>

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

        <div className="form-element">
          Номер задания:
      <form
        className="form-container homework-form"
        onSubmit={method.handleSubmit(
          !prevPageURL.includes('/homeworks') ? onSubmitAddnewTask : onSubmitUpdateTask
        )}
      >
        <h2 className="homework-form_title">
          {prevPageURL.includes('/homeworks') ? 'Редактировать задание' : 'Новое задание'}
        </h2>
        {currentRole == UserRole.Methodist && !prevPageURL.includes('/homeworks') ? (
          <div className="form-element courses-list">
            Номер курса:
            {coursesData ? <CheckboxGroup checkboxArr={coursesData} name="courseIds" /> : ''}
          </div>
        ) : currentRole != UserRole.Methodist ? (
          <div className="form-element">
            Номер группы:
            <RadioGroup radioData={group} name="groupId" callback={getGroupId} />
          </div>
        ) : (
          ''
        )}
        {/* <div className="form-element">
          <span>Номер задания:</span> {<FilterList data={[]}></FilterList>}
          <span className="homework-form_task">
            {selectedTaskCount === 0 ? '1' : selectedTaskCount}
          </span>
        </div>  */}
        {/* скрыт элемент фильтра, который лишний в макете */}
        {!prevPageURL.includes('/homeworks') ? (
          <div className="homework-form_dates form-grid-container">
            <div>
              Дата выдачи задания
              <Controller
                name="homework.startDate"
                control={method.control}
                rules={{ required: true }}
                render={({ field }) => <Datepicker field={field} />}
              />
            </div>
            <div>
              Срок сдачи задания
              <Controller
                name="homework.endDate"
                control={method.control}
                rules={{ required: true }}
                render={({ field }) => <Datepicker field={field} />}
              />
            </div>
        </div>

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
        ) : (
          ''
        )}
        )}

        <div className="form-element">
          Название задания
          {!prevPageURL.includes('/homeworks') ? (
            <input
              className="form-input"
              type="text"
              placeholder="Введите название"
              {...method.register('name', { required: true })}
            />
          ) : (
            <input
              className="form-input"
              type="text"
              defaultValue={task?.name}
              {...method.register('name', { required: true })}
            />
          )}
          <input
            className={`form-input${method.formState.errors.name ? ' invalid-input' : ''}`}
            type="text"
            placeholder="Введите название"
            {...method.register('name', { required: true })}
          />
        </div>
        <div className="invalid-feedback">{method.formState.errors.name?.message}</div>

        <div className="form-element">
          Описание задания
          {!prevPageURL.includes('/homeworks') ? (
            <textarea
              className="form-input"
              placeholder="Введите текст"
              {...method.register('description', { required: true })}
            />
          ) : (
            <textarea
              className="form-input"
              defaultValue={task?.description}
              {...method.register('description', { required: true })}
            />
          )}
          <textarea
            className={`form-input${method.formState.errors.description ? ' invalid-input' : ''}`}
            placeholder="Введите текст"
            {...method.register('description', { required: true })}
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
                addLinkInForm(value);
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
        <div className="buttons-group">
          {currentRole === UserRole.Teacher ? (
            <Button text="Опубликовать" model={ButtonModel.Colored} type={ButtonType.submit} />
          ) : (
            ''
          )}
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
            text={isEdit ? 'Сохранить' : 'Сохранить как черновик'}
            model={ButtonModel.White}
            type={ButtonType.submit}
            disabled={inProcess || !!linkValue}
            onClick={() => setIsPublish(false)}
          />
          <Button text="Отмена" type={ButtonType.reset} model={ButtonModel.Text} />
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
