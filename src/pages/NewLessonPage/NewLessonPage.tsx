import moment from 'moment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import Datepicker from '../../components/Datepicker/Datepicker';
import { LinkWithUnderline } from '../../components/LinkWithUnderline/LinkWithUnderline';
import { RadioData } from '../../components/RadioGroup/RadioButton/RadioButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';

export type NewLessonFormData = {
  date: string | Date;
  additionalMaterials: string;
  groupId?: number;
  name: string;
  linkToRecord: string;
  // isPublished: boolean;
};

const radioMock: RadioData[] = [
  {
    text: 'group1',
    value: 1,
  },
  {
    text: 'group2',
    value: 2,
  },
];

export const NewLessonPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<NewLessonFormData>({
    defaultValues: {
      date: `${moment().format('DD.MM.YYYY')}`,
      additionalMaterials: '',
      groupId: undefined,
      name: '',
      linkToRecord: '',
    },
  });
  const navigate = useNavigate();
  const onSubmit = () => {
    alert('SUBMIT!');
    reset();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-between">
        <h2 className="homework-form_title">Новое занятие</h2>
        <LinkWithUnderline path="aaa" text="Список сохраненных занятий"></LinkWithUnderline>
      </div>
      <div className="form-element flex-container">
        Номер группы:
        <div className="radio-group-container flex-container">
          {/* <RadioGroup radioData={grpups} name="groupId" /> */}
        </div>
      </div>
      <span className="invalid-feedback">{errors?.groupId?.message}</span>
      <div>
        Дата проведения занятия
        <Controller
          name="date"
          control={control}
          defaultValue={`${moment().format('DD.MM.YYYY')}`}
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
          {...register('linkToRecord', { required: true })}
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
          disabled={true}
          onClick={() => {}}
        />
        <Button
          text={'Сохранить'}
          model={ButtonModel.White}
          type={ButtonType.submit}
          disabled={true}
          onClick={() => {}}
        />
        <Button
          text="Отмена"
          type={ButtonType.reset}
          model={ButtonModel.Text}
          onClick={() => navigate(-1)}
        />
      </div>
    </form>
  );
};
