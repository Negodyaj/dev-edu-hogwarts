import { Controller, FormProvider, useForm } from 'react-hook-form';
import './NewHomework.scss';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import Datepicker from '../../components/Datepicker/Datepicker';
import {
  Button,
  ButtonModel,
  ButtonType,
} from '../../components/Button/Button';
import { baseWretch } from '../../services/base-wretch.service';
import { addNewTaskUrl, getHomeworksByGroupId } from '../../shared/consts';
import moment from 'moment';
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

export type AddTaskFormData = {
  name: string;
  description: string;
  homework: {
    startDate: string;
    endDate: string;
  };
  groupId: number;
};

export const NewHomework = () => {
  const method = useForm<AddTaskFormData>();
  const dispatch = useDispatch();

  const {
    links,
    inputLinkValue,
    group,
    selectedGroupTaskCount,
    selectGroupId,
  } = useSelector((state: AppState) => state.newHomeworkFormState);
  const refLinkName = useRef<any>({});

  const memoizeMapLinks = useMemo(() => {
    return links.map((item, index) => {
      return <AddedLink key={index} itemNumber={index} source={item} />;
    });
  }, [links]);

  const addLinkInForm = () => {
    if (
      inputLinkValue &&
      /^[a-z]+:\/\//i.test(inputLinkValue) &&
      !links.includes(inputLinkValue)
    )
      dispatch(addLink(refLinkName.current.value));
  };

  const convertDate = (date: string) => {
    return moment(new Date(date)).format('DD.MM.YYYY').toString();
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

    baseWretch().url(addNewTaskUrl).post(formData);
  };

  const getGroupId = (groupId: number) => {
    console.log(groupId);
    dispatch(selectGroup(groupId));
  };
  // const saveDraft = () => {
  // };

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
        onSubmit={method.handleSubmit(onSubmit)}
      >
        <span className="homework-form_title">Новое задание</span>

        <div className="homework-form_area">
          Номер группы:
          <RadioGroup radioData={group} name="groupId" callback={getGroupId} />
        </div>

        <div className="homework-form_area">
          Номер задания:
          {/*
              По-хорошему, обещали на бэке номера таскам выдавать,
              для визуализации оставляю так до ревью :^)
           */}
          <span className="homework-form_task">
            {selectedGroupTaskCount === 0 ? '' : selectedGroupTaskCount}
          </span>
        </div>

        <div className="homework-form_dates">
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

        <div className="homework-form_area">
          Название задания
          <input
            className="form-input"
            type="text"
            placeholder="Введите название"
            {...method.register('name', { required: true })}
          />
        </div>

        <div className="homework-form_area">
          Описание задания
          <textarea
            className="form-input"
            placeholder="Введите текст"
            {...method.register('description', { required: true })}
          />
        </div>

        <div className="homework-form_area">
          Полезные ссылки
          {links.length > 0 && memoizeMapLinks}
          <div className="form-input_link__container">
            <textarea
              className="form-input form-input_link"
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
          />
          <Button
            text="Сохранить как черновик"
            model={ButtonModel.White}
            type={ButtonType.submit}
          />
          <Button
            text="Отмена"
            type={ButtonType.reset}
            model={ButtonModel.Text}
            url={'/'}
          />
        </div>
      </form>
    </FormProvider>
  );
};
