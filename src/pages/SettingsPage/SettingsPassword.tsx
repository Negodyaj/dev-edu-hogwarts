// import React, { useState } from 'react';
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
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { settingsLink } from '../../components/MainPanel/Navigation/constants';
import { Input } from '../../components/styled/Input';

export type FormPasswordData = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export const SettingsPassword = () => {
  // const [isOk] = useState<boolean>(false);
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
    });
  const formOptions = { resolver: yupResolver(validationSchema()) };
  const {
    register,
    handleSubmit,
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
              <div className="form-element">
                <p>Cтарый пароль</p>
                <Input type="password" register={register} name="oldPassword" />
                <div className="invalid-feedback">{errors.oldPassword?.message}</div>
              </div>
              <div className="form-element">
                <p>Новый пароль</p>
                <Input type="password" register={register} name="newPassword" />
                <div className="invalid-feedback">{errors.newPassword?.message}</div>
              </div>
              <div className="form-element">
                <p>Повторите новый пароль</p>
                <Input type="password" register={register} name="newPasswordRepeat" />
                <div className="invalid-feedback">{errors.newPasswordRepeat?.message}</div>
              </div>
            </div>
            <div className="buttons-group">
              <Button
                text={'Сохранить'}
                type={ButtonType.submit}
                model={ButtonModel.Colored}
                width="190"
              />
              <Button
                text={'Отмена'}
                url={settingsLink}
                type={ButtonType.reset}
                model={ButtonModel.Text}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
