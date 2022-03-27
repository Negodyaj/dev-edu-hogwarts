import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LinkArrow } from "../../components/LinkArrow/LinkArrow"
import { setToken } from "../../services/auth.service";
import { baseWretch } from "../../services/base-wretch.service";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../SettingsPage/SettingsPage.scss';
export type FormPasswordData = {
  oldPassword: string,
  newPassword: string,
  newPasswordRepeat: string
}
export const SettingsPassword = () => {
  const onSubmit = (data: FormPasswordData) => baseWretch()
    .url('api/Users/password')
    .put({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      newPasswordRepeat: data.newPasswordRepeat
    });

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required('Введите новый пароль')
        .min(8, 'Пароль должен содержать более 8 символов'),
    newPasswordRepeat: Yup.string()
        .required('Введите новый пароль')
        .oneOf([Yup.ref('newPassword')], 'Пароли должны совпадать')
        
});

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit,  reset, formState: { errors } } = useForm<FormPasswordData>(formOptions);



  return (
    <div className="settings-container">
      <LinkArrow back={false} text={"Назад"} to={"settings"}></LinkArrow>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="title">Редактирование пароля</p>
        <div className="grid-container">
          <div>
            <p>Cтарый пароль</p>
            <input type="password" {...register("oldPassword",{

            })}></input>
          </div>
          <div className="new-password">
            <p>Новый пароль</p>
            <input type="password"  {...register("newPassword")} className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}></input>
            <div className="invalid-feedback">{errors.newPassword?.message}</div>

          </div>
          <div className="repeate-password">
            <p>Повторите новый пароль</p>
            <input type="password" {...register("newPasswordRepeat")} className={`form-control ${errors.newPasswordRepeat ? 'is-invalid' : ''}`} ></input>
            <div className="invalid-feedback">{errors.newPasswordRepeat?.message}</div>

          </div>
        </div>
        <button type="submit" className='submit-button'>Сохранить</button>
          <button type='reset' onClick={() => reset()} className='submit-button'>Отмена</button>
      </form>
    </div>
  )
}