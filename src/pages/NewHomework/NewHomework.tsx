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
// import { FilterList } from '../../components/FilterList/FilterList';
// import { CoursesPageState } from '../../store/reducers/courses.reducer';
// import { CoursesPageState } from '../../store/reducers/courses.reducer';

export type AddTaskFormData = {
  name: string;
  description: string;
  homework: {
    startDate: string;
    endDate: string;
  };
  groupId?: number;
  courseId?: number;
};

export const NewHomework = () => {
  const method = useForm<AddTaskFormData>();
  const dispatch = useDispatch();
  const { currentUser, currentRole } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  const { links, inputLinkValue, group, selectGroupId, course } = useSelector(
    (state: AppState) => state.newHomeworkFormState
  );
  const refLinkName = useRef<any>({});

  const memoizeMapLinks = useMemo(() => {
    return links.map((item, index) => {
      return <AddedLink key={index} itemNumber={index} source={item} />;
    });
  }, [links]);

  const addLinkInForm = () => {
    if (inputLinkValue && /^[a-z]+:\/\//i.test(inputLinkValue) && !links.includes(inputLinkValue))
      dispatch(addLink(refLinkName.current.value));
  };

  const onSubmit = (data: AddTaskFormData) => {
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
    } else {
      baseWretch().url(addNewTaskUrlByMethodist).post(formData);
    }
  };

  const getGroupId = (groupId: number) => {
    console.log(groupId);
    dispatch(selectGroup(groupId));
  };

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
      <form className="form-container homework-form" onSubmit={method.handleSubmit(onSubmit)}>
        <h2 className="homework-form_title">Новое задание</h2>
        {currentUser?.roles.includes(UserRole.Methodist) ? (
          <div className="form-element">
            Номер курса:
            <RadioGroup radioData={course} name="groupId" callback={getGroupId} />
          </div>
        ) : (
          <div className="form-element">
            Номер группы:
            <RadioGroup radioData={group} name="groupId" callback={getGroupId} />
          </div>
        )}
        {/* <div className="form-element">
          <span>Номер задания:</span> {<FilterList data={[]}></FilterList>}
          <span className="homework-form_task">
            {selectedGroupTaskCount === 0 ? '' : selectedGroupTaskCount}
          </span>
        </div> */}

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

        <div className="form-element">
          Название задания
          <input
            className="form-input"
            type="text"
            placeholder="Введите название"
            {...method.register('name', { required: true })}
          />
        </div>

        <div className="form-element">
          Описание задания
          <textarea
            className="form-input"
            placeholder="Введите текст"
            {...method.register('description', { required: true })}
          />
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
          <Button text="Опубликовать" model={ButtonModel.Colored} type={ButtonType.submit} />
          <Button
            text="Сохранить как черновик"
            model={ButtonModel.White}
            type={ButtonType.submit}
          />
          <Button text="Отмена" type={ButtonType.reset} model={ButtonModel.Text} url={'/'} />
        </div>
      </form>
    </FormProvider>
  );
};
