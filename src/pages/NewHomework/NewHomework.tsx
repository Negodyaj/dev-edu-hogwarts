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
  getTasksCount,
  removeLinks,
  selectCourse,
  selectGroup,
  setValueInInput,
} from '../../actions/newHomeworkForm.action';
import { AddedLink } from './components/AddedLink';
import { Homework, Task } from '../../models/responses/HomeworksResponse';
import { convertDate } from '../../shared/helpers/dateHelpers';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import {
  createNewHomework,
  createNewTaskByMethodist,
  createNewTaskByTeacher,
  getCourses,
  tasksCountInCourse,
  tasksCountInGroup,
} from '../../actions/homeworks.thunks';
import { UserRole } from '../../shared/enums/UserRole';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { validationSchema } from './components/ValidationSchema';

export type AddHomeworkFormData = {
  name: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  links: string;
  groupId: number;
};

type HomeworkFormProps = {
  initialTask?: Task;
  initialHomework?: Homework;
  selectedGroup?: number;
};

export const NewHomework = ({ initialTask, initialHomework, selectedGroup }: HomeworkFormProps) => {
  const [isPublish, setIsPublish] = useState(true);

  const method = useForm<AddHomeworkFormData>({
    resolver: yupResolver(validationSchema),
    context: { publish: isPublish },
  });
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
  const refLinkName = useRef<any>({});
  const [linkValue, setLinkValue] = useState<string | undefined>(undefined);

  const memoizeMapLinks = useMemo(() => {
    return links.map((item, index) => {
      return <AddedLink key={index} itemNumber={index} source={item} />;
    });
  }, [links]);

  const addLinkInForm = (value?: string) => {
    if (
      (inputLinkValue &&
        /^[a-z]+:\/\//i.test(value ?? inputLinkValue) &&
        !links.includes(value ?? inputLinkValue)) ||
      inputLinkValue.length === 0 ||
      value === ''
    ) {
      setLinkValue(undefined);
    } else {
      setLinkValue('Введите корректную ссылку');
    }
  };

  const onSubmit = (data: AddHomeworkFormData) => {
    const formData = {
      ...data,
      links: links.join(' [link] '),
      isRequired: true,
      startDate: data.startDate
        ? convertDate(data.startDate.toString())
        : moment().format('DD.MM.YYYY'),
      endDate: convertDate(data.endDate.toString()),
    };
    debugger;
    if (isPublish) {
      if (!linkValue) {
        dispatch(createNewHomework(formData));
      }
    } else {
      if (currentRole === UserRole.Teacher) {
        dispatch(createNewTaskByTeacher(formData, links));
      } else if (currentRole === UserRole.Methodist) {
        dispatch(createNewTaskByMethodist(formData, links));
      }
    }

    if (!errorMessage) {
      links.length = 0;
      method.reset({
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
      });
    }
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
    if (initialTask?.links) {
      const linksInResp = initialTask?.links.split(' [link] ');
      linksInResp.forEach((link) => dispatch(addLink(link)));
    } else if (initialHomework?.task.links) {
      const linksInResp = initialHomework?.task.links.split(' [link] ');
      linksInResp.forEach((link) => dispatch(addLink(link)));
    }
    return () => {
      method.reset();
      dispatch(removeLinks());
      dispatch(setValueInInput(''));
      dispatch(getTasksCount([]));
    };
  }, []);

  useEffect(() => {
    const id = method.getValues('groupId');
    if (currentRole === UserRole.Teacher && id) {
      dispatch(tasksCountInGroup(id));
    } else if (currentRole === UserRole.Methodist && id) {
      dispatch(tasksCountInCourse(id));
    }
  }, [selectGroupId]);

  return (
    <FormProvider {...method}>
      <form className="form-container homework-form" onSubmit={method.handleSubmit(onSubmit)}>
        <h2 className="homework-form_title">Новое задание</h2>

        <div className="form-element flex-container">
          Номер группы:
          <div className="radio-group-container flex-container">
            <RadioGroup
              radioData={currentRole === UserRole.Methodist ? course : group}
              name="groupId"
              callback={getId}
              selected={
                currentRole === UserRole.Teacher
                  ? group.find((item) => item.value === selectedGroup)
                  : undefined
              }
            />
          </div>
        </div>
        <span className="invalid-feedback">{method.formState.errors.groupId?.message}</span>

        <div className="form-element">
          Номер задания:
          {/*
              По-хорошему, обещали на бэке номера таскам выдавать,
              для визуализации оставляю так до ревью :^)
           */}
          <span className="homework-form_task">
            {selectedTaskCount === 0 ? '1' : selectedTaskCount}
          </span>
        </div>

        {currentRole === UserRole.Teacher && (
          <div className="homework-form_dates form-grid-container">
            <div>
              Дата выдачи задания
              <Controller
                name="startDate"
                control={method.control}
                defaultValue={moment(
                  initialHomework?.startDate ?? new Date(),
                  'DD.MM.YYYY'
                ).toDate()}
                // rules={{ required: isPublish === 'homework' }}
                render={({ field }) => <Datepicker field={field} />}
              />
            </div>
            <div>
              Срок сдачи задания
              <Controller
                name="endDate"
                control={method.control}
                rules={{ required: isPublish }}
                defaultValue={moment(initialHomework?.endDate ?? new Date(), 'DD.MM.YYYY').toDate()}
                render={({ field }) => <Datepicker field={field} />}
              />
              <div className="invalid-feedback">{method.formState.errors.endDate?.message}</div>
            </div>
          </div>
        )}

        <div className="form-element">
          Название задания
          <input
            className={`form-input${method.formState.errors.name ? ' invalid-input' : ''}`}
            type="text"
            placeholder="Введите название"
            defaultValue={initialTask?.name ?? initialHomework?.task.name ?? ''}
            {...method.register('name', { required: true })}
          />
        </div>
        <div className="invalid-feedback">{method.formState.errors.name?.message}</div>

        <div className="form-element">
          Описание задания
          <textarea
            className={`form-input${method.formState.errors.description ? ' invalid-input' : ''}`}
            placeholder="Введите текст"
            defaultValue={initialTask?.description ?? initialHomework?.task.description ?? ''}
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
        {linkValue && <div className="invalid-feedback">{linkValue}</div>}

        <div className="buttons-group">
          {currentRole === UserRole.Teacher && (
            <Button
              text="Опубликовать"
              model={ButtonModel.Colored}
              type={ButtonType.submit}
              disabled={inProcess}
              onClick={() => setIsPublish(true)}
            />
          )}
          <Button
            text="Сохранить как черновик"
            model={ButtonModel.White}
            type={ButtonType.submit}
            onClick={() => setIsPublish(false)}
          />
          <Button
            text="Отмена"
            type={ButtonType.reset}
            model={ButtonModel.Text}
            onClick={() => navigate(-1)}
          />
          {location.pathname.includes('edit') && (
            <Button
              text="Удалить занятие"
              type={ButtonType.button}
              model={ButtonModel.Text}
              width="250"
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};
