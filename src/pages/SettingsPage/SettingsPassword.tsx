import React, { useState } from 'react';
import { baseWretch } from '../../services/base-wretch.service';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../SettingsPage/SettingsPage.scss';
import { useForm } from 'react-hook-form';
import { BackButton } from '../../components/LinkArrow/BackButton';

export type FormPasswordData = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export const SettingsPassword = () => {
  const [isOk, setIsOk] = useState<boolean>(false);
  const onSubmit = (data: FormPasswordData) =>
    baseWretch()
      .url('api/Users/password')
      .put({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        newPasswordRepeat: data.newPasswordRepeat,
      })
      .res((res) => {
        if (res.status == 403) {
          setIsOk(true);
        }
        console.log(res);
      });

  const validationSchema = () =>
    Yup.object().shape({
      newPassword: Yup.string()
        .required('Введите новый пароль')
        .min(8, 'Пароль должен содержать более 8 символов'),
      newPasswordRepeat: Yup.string()
        .required('Введите новый пароль')
        .oneOf([Yup.ref('newPassword')], 'Пароли должны совпадать'),
      oldPassword: Yup.string(),
      //.oneOf([Yup.ref(`${password}`)], "error")
    });

  const formOptions = { resolver: yupResolver(validationSchema()) };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPasswordData>(formOptions);

  return (
    <div className="settings-container">
      <BackButton />
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="title">Редактирование пароля</p>
        <div className="grid-container">
          <div>
            <p>Cтарый пароль</p>
            <input
              type="password"
              className={`form-control ${isOk ? 'is-invalid' : ''}`}
              {...register('oldPassword', {})}
            ></input>
            <div className="invalid-feedback">
              {errors.oldPassword?.message}
            </div>
          </div>
          <div className="new-password">
            <p>Новый пароль</p>
            <input
              type="password"
              {...register('newPassword')}
              className={`form-control ${
                errors.newPassword ? 'is-invalid' : ''
              }`}
            ></input>
            <div className="invalid-feedback">
              {errors.newPassword?.message}
            </div>
          </div>
          <div className="repeate-password">
            <p>Повторите новый пароль</p>
            <input
              type="password"
              {...register('newPasswordRepeat')}
              className={`form-control ${
                errors.newPasswordRepeat ? 'is-invalid' : ''
              }`}
            ></input>
            <div className="invalid-feedback">
              {errors.newPasswordRepeat?.message}
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Сохранить
        </button>
        <button type="reset" onClick={() => reset()} className="submit-button">
          Отмена
        </button>
      </form>
    </div>
  );
};
