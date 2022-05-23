import { Controller, FormProvider, useForm } from 'react-hook-form';
import './NewHomework.scss';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import Datepicker from '../../components/Datepicker/Datepicker';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { baseWretch } from '../../services/base-wretch.service';
import { getHomeworksByGroupId } from '../../shared/consts';
import { Icon } from '../../shared/enums/Icon';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import {
  addLink,
  getTasksCount,
  removeLinks,
  selectGroup,
  setValueInInput,
} from '../../actions/newHomeworkForm.action';
import { AddedLink } from './components/AddedLink';
import { Homework, Task } from '../../models/responses/HomeworksResponse';
import { convertDate } from '../../shared/helpers/dateHelpers';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { createNewHomework, createNewTaskByTeacher } from '../../actions/homeworks.thunks';

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
  const validationSchema = yup.object().shape({
    name: yup.string().required('Введите название'),
    description: yup.string().required('Введите описание'),
    endDate: yup.string().when('$publish', {
      is: true,
      then: yup
        .string()
        .required('Выберите дату окончания')
        .test(
          'check-date',
          'Выбрана некорректная дата',
          (date) =>
            moment(new Date(), 'DD.MM.YYYY').toString() !==
            convertDate(date ? date : new Date().toString())
        ),
      otherwise: yup.string().notRequired(),
    }),
    groupId: yup.mixed().required('Не выбрана ни одна группа'),
  });

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
    selectedGroupTaskCount,
    selectGroupId,
    errorMessage,
    inProcess,
  } = useSelector((state: AppState) => state.newHomeworkFormState);
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
      dispatch(createNewTaskByTeacher(formData, links));
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

  const getGroupId = (groupId: number) => {
    dispatch(selectGroup(groupId));
  };

  useEffect(() => {
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

        <div className="form-element">
          Номер группы:
          <RadioGroup
            radioData={group}
            name="groupId"
            callback={getGroupId}
            selected={group.find((item) => item.value === selectedGroup)}
          />
        </div>
        <span className="invalid-feedback">{method.formState.errors.groupId?.message}</span>

        <div className="form-element">
          Номер задания:
          {/*
              По-хорошему, обещали на бэке номера таскам выдавать,
              для визуализации оставляю так до ревью :^)
           */}
          <span className="homework-form_task">
            {selectedGroupTaskCount === 0 ? '1' : selectedGroupTaskCount}
          </span>
        </div>

        <div className="homework-form_dates form-grid-container">
          <div>
            Дата выдачи задания
            <Controller
              name="startDate"
              control={method.control}
              defaultValue={moment(initialHomework?.startDate ?? new Date(), 'DD.MM.YYYY').toDate()}
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
          <Button
            text="Опубликовать"
            model={ButtonModel.Colored}
            type={ButtonType.submit}
            disabled={inProcess}
            onClick={() => setIsPublish(true)}
          />
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
