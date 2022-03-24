import './RegistrationPage.scss';
import React from 'react';
import { useForm } from "react-hook-form";
import { baseWretch } from '../../services/base-wretch.service';



export const RegistrationPage = () => {

  baseWretch()
    .url('register')
    .post({
      "firstName": "Artur",
      "lastName": "Khamatnurov",
      "patronymic": "Valeryevich",
      "email": "arturkh.116@gmail.com",
      "username": "string",
      "password": "stringst",
      "city": "SaintPetersburg",
      "birthDate": "01.01.2020",
      "gitHubAccount": "string",
      "photo": "https://klike.net/uploads/posts/2021-01/1611131113_2.jpg",
      "phoneNumber": "string"
    }).res(res => console.log(res));

  

    

    return (
      <div className="register-form-wrapper">
        <h2>Регистрация</h2>
        <form action="">
          <div className='flex-column'>
            <label htmlFor="surname">Фамилия<span className='asterisk'> *</span></label>
            <input type="text" placeholder='Ефременков' name='surname' id='surname' />
          </div>
          <div className='flex-row'>
            <div className='flex-column'>
              <label htmlFor="name">Имя<span className='asterisk'> *</span></label>
              <input type="text" placeholder='Антон' name='name' id='name' />
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
              <input type="password" name="password" id="password" />
            </div>
            <div className="flex-column">
              <label htmlFor="repeat-password">Повторить пароль<span className='asterisk'> *</span></label>
              <input type="password" name="repeat-password" id="repeat-password" />
            </div>
          </div>
          <div className="flex-row">
            <div className="flex-column">
              <label htmlFor="email">E-mail<span className='asterisk'> *</span></label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="flex-column">
              <label htmlFor="phone-num">Телефон</label>
              <input type="tel" name="phone-num" id="phone-num" />
            </div>
          </div>
          <p><span className='asterisk'>* </span>Поля обязательные для заполнения</p>
          <div className='buttons'>
            <button className='reg-button'>Зарегистрироваться</button>
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