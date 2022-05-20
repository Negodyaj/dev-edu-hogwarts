import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../SettingsPage/SettingsPage.scss';
import { useForm } from 'react-hook-form';
import { BackButton } from '../../components/BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../actions/settings.thunk';
import { AppState } from '../../store/store';
import { SettingsPageState } from '../../store/reducers/settings.reducer';
import { Loader } from '../HomeworksPage/HomeworkPage/Loader';

export type FormPasswordData = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export const SettingsPassword = () => {
  const [isOk] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onSubmit = (data: FormPasswordData) => {
    dispatch(updateUserPassword(data));
  };
  const { isLoading } = useSelector(
    (state: AppState) => state.settingsPageState as SettingsPageState
  );
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="settings-container">
          <BackButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="title">Редактирование пароля</p>
            <div className="form-grid-container">
              <div>
                <p>Cтарый пароль</p>
                <input
                  type="password"
                  className={`form-control ${isOk ? 'is-invalid' : ''}`}
                  {...register('oldPassword', {})}
                />
                <div className="invalid-feedback">{errors.oldPassword?.message}</div>
              </div>
              <div className="new-password">
                <p>Новый пароль</p>
                <input
                  type="password"
                  {...register('newPassword')}
                  className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.newPassword?.message}</div>
              </div>
              <div className="repeate-password">
                <p>Повторите новый пароль</p>
                <input
                  type="password"
                  {...register('newPasswordRepeat')}
                  className={`form-control ${errors.newPasswordRepeat ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.newPasswordRepeat?.message}</div>
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
      )}
    </>
  );
};
