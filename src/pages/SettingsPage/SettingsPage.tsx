import { useForm } from 'react-hook-form';
import '../SettingsPage/SettingsPage.scss';
import '../SettingsPage/SettingsPage.scss'
  ; import { baseWretch } from '../../services/base-wretch.service';
import { useEffect, useRef, useState } from 'react';
import { getToken, getIdFromToken } from '../../services/auth.service';
import '../../components/SvgIcon/SvgIcon';
import { Route, Link, Routes, useLocation } from "react-router-dom";
import { SettingsPassword } from './SettingsPassword';
import photo from '../../components/images/avatar_settings.png';
import { SvgIcon } from '../../components/SvgIcon/SvgIcon';
import { Icon } from '../../shared/enums/Icon';
import { NavLink } from 'react-router-dom';
import { LinkArrow } from '../../components/LinkArrow/LinkArrow';
import { text } from 'stream/consumers';
import { SvgPencil } from '../../components/SvgIcon/SvgFiles/SvgPencil';
export type UserFormData = {
  id: 1,
  firstName: string,
  lastName: string,
  patronymic: string,
  email: string,
  password: string,
  birthDate: string,
  gitHubAccount: string,
  phoneNumber: string,
  city: 1,
  username: string
}


export const SettingsPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>();

  const token = getToken();

  const userId = getIdFromToken(token);


  const [user, setUser] = useState<any>({});
  useEffect(() => {
    baseWretch()
      .url('api/Users/' + userId)
      .get()
      .json((data: any) => setUser(data))
  }, []);


  const onSubmit = (data: UserFormData) => baseWretch()
    .url('api/Users/' + userId)
    .put({
      id: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
      gitHubAccount: data.gitHubAccount,
      phoneNumber: data.phoneNumber,
      city: 1,
      username: user.username

    });



  return (
    <div className='settings-container'>
      <div className='settings-container-info'>
        <div className='settings'>Настройки аккаунта</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex-container'>
          <div>
          <div className='data-block'>
            <p>Фамилия</p>
            <input
            className='lstName'
              defaultValue={user.lastName}
              type="text"
              {...register('lastName', {
                required: true,
                maxLength: 20,
                pattern: /^[a-zа-яё]+$/i

              })}/>
               {errors?.lastName?.type === "maxLength" && (
            <p className='error-message'>Превышена допустимая длина 20 символов</p>
          )}
          {errors?.lastName?.type === "pattern" && (
            <p className='error-message'>Введите корректные данные </p>
          )}
          </div>
          <div className='data-block'>
            <p>Имя</p>
            <input defaultValue={user.firstName} {...register('firstName',{
               required: true,
               maxLength: 20,
               pattern: /^[a-zа-яё]+$/i

            })}></input>
             {errors?.firstName?.type === "maxLength" && (
            <p className='error-message'>Превышена допустимая длина 20 символов</p>
          )}
          {errors?.firstName?.type === "pattern" && (
            <p className='error-message'>Введите корректные данные </p>
          )}
          </div>
          <div className='data-block'>
            <p>Отчество</p>
            <input defaultValue={user.patronymic} {...register('patronymic',{
              required: true,
              maxLength: 30,
              pattern:  /^[a-zа-яё]+$/i

            })}></input>
              {errors?.patronymic?.type === "maxLength" && (
            <p className='error-message'>Превышена допустимая длина 20 символов</p>
          )}
          {errors?.patronymic?.type === "pattern" && (
            <p className='error-message'>Введите корректные данные</p>
          )}
          </div>
          <div className='data-block'>
            <p>Дата рождения</p>
            <input type="date" id="datepicker"  {...register('birthDate')} />
          </div>
         
              <div className='data-block'>
                <p>Пароль</p>
                <div className='goto-change-password'>
                  <div>
                    <div className='circle-password'></div>
                    <div className='circle-password'></div>
                    <div className='circle-password'></div>
                    <div className='circle-password'></div>
                    <div className='circle-password'></div>
                    <div className='circle-password'></div>
                    <div className='circle-password'></div>
                    <div className='circle-password'></div>
                  </div>

                  <Link to={'/settings/change-password'}><SvgPencil></SvgPencil></Link>

              
            </div>
            </div>
              <div className='data-block'>
                <p>Email</p>
                <input defaultValue={user.email} {...register('email', {
                  required:true,
                  pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
                })}></input>
                 {errors?.email?.type === "required" && <p className='error-message'>Введите данные</p>}
                 {errors?.email?.type === "pattern" && <p className='error-message'>Проверьте корректность данных</p>}
              </div>
          <button type="submit" className='submit-button'>Сохранить</button>
          <button type='reset' className='submit-button'>Отмена</button>
          </div>

            <div className='margin-left-inputs'>
              <img className='settings-photo' src={photo}></img>
              <div className='data-block'>
                <p>Ссылка на гитхаб</p>
                <input defaultValue={user.gitHubAccount} {...register('gitHubAccount',{
                  required:true,
                  pattern: /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
                })}></input>
                {errors?.gitHubAccount?.type === "pattern" && <p className='error-message'>Проверьте корректность данных</p>}
              </div>
              <div className='data-block'>
                <p>Мобилочка</p>
                <input type='tel' defaultValue={user.phoneNumber} {...register('phoneNumber',{
                  required:true,
                  pattern:/^[ 0-9]+$/
                })}></input>
                 {errors?.phoneNumber?.type === "pattern" && <p className='error-message'>Проверьте корректность данных</p>}
              </div>
            </div>
            </div>
        </form>
      </div>
      

    </div>
  )
}



