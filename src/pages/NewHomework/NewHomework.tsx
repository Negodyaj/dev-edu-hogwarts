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
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import {
  addLink,
  getTasksCount,
  selectGroup,
  setValueInInput,
} from '../../actions/newHomeworkForm.action';
import { AddedLink } from './components/AddedLink';
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
export const NewHomework = () => {
  const location = useLocation();
  console.log(location.key);
  const { prevPageURL, task } = useSelector((state: AppState) => state.homeworkPageState);
  const method = useForm<any>();
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { links, inputLinkValue, group, selectGroupId } = useSelector(
    (state: AppState) => state.newHomeworkFormState
  );
  const { courses } = useSelector((state: AppState) => state.coursesPageState);
  const refLinkName = useRef<any>({});
  const memoizeMapLinks = useMemo(() => {
    return links.map((item, index) => {
      return <AddedLink key={index} itemNumber={index} source={item} />;
    });
  }, [links]);
  console.log(prevPageURL);
  const addLinkInForm = () => {
    if (inputLinkValue && /^[a-z]+:\/\//i.test(inputLinkValue) && !links.includes(inputLinkValue))
      dispatch(addLink(refLinkName.current.value));
  };
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
    const groupId = method.getValues('groupId');
    if (groupId) {
      baseWretch()
        .url(getHomeworksByGroupId(groupId))
        .get()
        .json((data) => dispatch(getTasksCount(data as Homework[])));
    }
  }, [selectGroupId]);
  return (
    <FormProvider {...method}>
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
            {selectedGroupTaskCount === 0 ? '' : selectedGroupTaskCount}
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
        ) : (
          ''
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
        </div>

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
        </div>

        <div className="form-element">
          Полезные ссылки
          {links.length > 0 && memoizeMapLinks}
          <div className="form-input_link__container">
            <textarea
              className="form-input_link form-input"
              ref={refLinkName}
              value={inputLinkValue}
              onChange={(event) => {
                dispatch(setValueInInput(event.target.value));
              }}
              placeholder="Вставьте ссылку"
            />
            <div onClick={addLinkInForm} className="form-input_link__button">
              <SvgIcon icon={Icon.Plus} />
            </div>
          </div>
        </div>
        <div className="buttons-group">
          {currentRole === UserRole.Teacher ? (
            <Button text="Опубликовать" model={ButtonModel.Colored} type={ButtonType.submit} />
          ) : (
            ''
          )}

          <Button
            text="Сохранить как черновик"
            model={ButtonModel.White}
            type={ButtonType.submit}
          />
          <Button text="Отмена" type={ButtonType.reset} model={ButtonModel.Text} />
        </div>
      </form>
    </FormProvider>
  );
};
