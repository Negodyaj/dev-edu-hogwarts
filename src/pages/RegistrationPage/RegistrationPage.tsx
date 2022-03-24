import './RegistrationPage.scss';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setToken } from "../../services/auth.service";
import { baseWretch } from "../../services/base-wretch.service"
import { registerUrl } from "../../shared/consts";

export type RegisterFormData = {
  firstName: string
  lastName: string
  patronymic: string
  email: string
  password: string
  phoneNumber: string


}

export const RegistrationPage = () => {


  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const onSubmit = () => baseWretch()
    .url(registerUrl)
    .post({
      "firstName": "Artur",
      "lastName": "Khamatnurov",
      "patronymic": "Valeryevich",
      "email": "arturk32h@mail.com",
      "username": "string",
      "password": "stringst",
      "city": "SaintPetersburg",
      "birthDate": "01.01.2020",
      "gitHubAccount": "string",
      "photo": "https://klike.net/uploads/posts/2021-01/1611131113_2.jpg",
      "phoneNumber": "string"
    }).text(token => setToken(token));



  return (
    <div className="register-form-wrapper">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-column'>
          <label htmlFor="lastName">Фамилия<span className='asterisk'> *</span></label>
          <input type="text" placeholder='Ефременков' id='lastName' {...register("lastName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i
          })} />
          {errors?.lastName?.type === "required" && <p className='asterisk'>Обязательно для заполнения</p>}
          {errors?.lastName?.type === "maxLength" && (
            <p className='asterisk'>Превышена допустимая длина 20 символов</p>
          )}
          {errors?.lastName?.type === "pattern" && (
            <p className='asterisk'>Недопустимые символы</p>
          )}
        </div>
        <div className='flex-row'>
          <div className='flex-column'>
            <label htmlFor="firstName">Имя<span className='asterisk'> *</span></label>
            <input type="text" placeholder='Антон' id='firstName' {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i
            })} />
            {errors?.firstName?.type === "required" && <p className='asterisk'>Обязательно для заполнения</p>}
            {errors?.firstName?.type === "maxLength" && (
              <p className='asterisk'>Превышена допустимая длина 20 символов</p>
            )}
            {errors?.firstName?.type === "pattern" && (
              <p className='asterisk'>Недопустимые символы</p>
            )}
          </div>
          <div className='flex-column'>
            <label htmlFor="patronymic">Отчество</label>
            <input type="text" placeholder='Сергеевич' name='patronymic' id='patronymic' />
          </div>
        </div>
        <div className="flex-column">
          <label htmlFor="datepicker">Дата рождения</label>
          <input type="date" name="datepicker" id="datepicker" />
        </div>
        <div className='flex-row'>
          <div className='flex-column'>
            <label htmlFor="password">Пароль<span className='asterisk'> *</span></label>
            <input type="password" id="password" {...register("password", {
              required: true
            })} />
            {errors?.password?.type === "required" && <p className='attention'>Обязательно для заполнения</p>}
          </div>
          <div className="flex-column">
            <label htmlFor="repeat-password">Повторить пароль<span className='asterisk'> *</span></label>
            <input type="password" id="repeat-password" />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-column">
            <label htmlFor="email">E-mail<span className='asterisk'> *</span></label>
            <input type="email" id="email" placeholder='example@example.com' {...register("email", {
              required: true,
              pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            })} />
            {errors?.email?.type === "required" && <p className='attention'>Обязательно для заполнения</p>}
          </div>
          <div className="flex-column">
            <label htmlFor="phone-num">Телефон</label>
            <input type="tel" name="phone-num" id="phone-num" />
          </div>
        </div>
        <p><span className='attention'>* </span>Поля обязательные для заполнения</p>
        <div className='buttons'>
          <button className='reg-button' type='submit'>Зарегистрироваться</button>
          <button className='cancel-button'>Отмена</button>
        </div>
        <div className='flex-row'></div>
        <input type="checkbox" id="policy" name="policy" />
        <label htmlFor="policy" id='policy-label'>
          Настоящим подтверждаю, что я ознакомлен <br />
          и согласен с условиями политики конфиденциальности
        </label>
      </form>
    </div>
  )
}