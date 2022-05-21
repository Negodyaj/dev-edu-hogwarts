import { Controller, FormProvider, useForm } from 'react-hook-form';
import './NewHomework.scss';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import Datepicker from '../../components/Datepicker/Datepicker';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { baseWretch } from '../../services/base-wretch.service';
import {
  addNewHomeworkWithTaskByTeacher,
  addNewTaskByTeacher,
  getHomeworksByGroupId,
} from '../../shared/consts';
import { SvgIcon } from '../../components/SvgIcon/SvgIcon';
import { Icon } from '../../shared/enums/Icon';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

export type AddHomeworkFormData = {
  name: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  groupId: number;
};

export const NewHomework = () => {
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
          'Выберите дату окончания',
          (date) =>
            moment().format('DD.MM.YYYY').toString() !==
            convertDate(date ? date : new Date().toString())
        ),
      otherwise: yup.string().notRequired(),
    }),
    groupId: yup.mixed().required('Выберите группу'),
  });

  const method = useForm<AddHomeworkFormData>({
    resolver: yupResolver(validationSchema),
    context: { publish: isPublish },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { links, inputLinkValue, group, selectedGroupTaskCount, selectGroupId } = useSelector(
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

    if (isPublish) {
      baseWretch().url(addNewHomeworkWithTaskByTeacher).post(formData);
    } else {
      baseWretch()
        .url(addNewTaskByTeacher)
        .post({
          name: formData.name,
          description: formData.description,
          groupId: formData.groupId,
          links: links.join(' [link] '),
          isRequired: true,
        });
    }

    links.length = 0;
    method.reset({
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  const getGroupId = (groupId: number) => {
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

        <div className="form-element">
          Номер группы:
          <RadioGroup radioData={group} name="groupId" callback={getGroupId} />
        </div>
        <span className="invalid-feedback">{method.formState.errors.groupId?.message}</span>

        <div className="form-element">
          Номер задания:
          {/*
              По-хорошему, обещали на бэке номера таскам выдавать,
              для визуализации оставляю так до ревью :^)
           */}
          <span className="homework-form_task">
            {selectedGroupTaskCount === 0 ? '' : selectedGroupTaskCount}
          </span>
        </div>

        <div className="homework-form_dates form-grid-container">
          <div>
            Дата выдачи задания
            <Controller
              name="startDate"
              control={method.control}
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
              render={({ field }) => <Datepicker field={field} />}
            />
          </div>
          <span className="invalid-feedback">{method.formState.errors.endDate?.message}</span>
        </div>

        <div className="form-element">
          Название задания
          <input
            className={`form-input${method.formState.errors.name ? ' invalid' : ''}`}
            type="text"
            placeholder="Введите название"
            {...method.register('name', { required: true })}
          />
        </div>
        <span className="invalid-feedback">{method.formState.errors.name?.message}</span>

        <div className="form-element">
          Описание задания
          <textarea
            className={`form-input${method.formState.errors.description ? ' invalid' : ''}`}
            placeholder="Введите текст"
            {...method.register('description', { required: true })}
          />
        </div>
        <span className="invalid-feedback">{method.formState.errors.description?.message}</span>

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
          <Button
            text="Опубликовать"
            model={ButtonModel.Colored}
            type={ButtonType.submit}
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
        </div>
      </form>
    </FormProvider>
  );
};
