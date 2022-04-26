import './RegistrationPage.scss';
import { Controller, useForm } from 'react-hook-form';
import { setToken } from '../../services/auth.service';
import { baseWretch } from '../../services/base-wretch.service';
import { registerUrl } from '../../shared/consts';
import Datepicker from '../../components/Datepicker/Datepicker';
import moment from 'moment';
import { CheckboxBtn } from '../../components/CheckBoxGroup/CheckBox/Checkbox';
import {
  Button,
  ButtonModel,
  ButtonType,
} from '../../components/Button/Button';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthdate: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const convertDate = (date: string) => {
  return moment(new Date(date)).format('DD.MM.YYYY').toString();
};

export const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const onSubmit = (data: RegisterFormData) =>
    baseWretch()
      .url(registerUrl)
      .post({
        ...data,
        birthdate: convertDate(data.birthdate),
        username: 'string',
        city: 1,
      })
      .text((token) => setToken(token));

  return (
    <div className="register-form-wrapper content-container">
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex-container">
            <div>
              <div className="flex-item item-lastName">
                <label htmlFor="lastName">
                  Фамилия<span className="asterisk"> *</span>
                </label>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Ефременков"
                  id="lastName"
                  {...register('lastName', {
                    required: true,
                    maxLength: 20,
                    pattern: /^[А-Я][а-я]+$/i,
                  })}
                />
                {errors?.lastName?.type === 'required' && (
                  <p className="asterisk">Обязательно для заполнения</p>
                )}
                {errors?.lastName?.type === 'maxLength' && (
                  <p className="asterisk">
                    Превышена допустимая длина 20 символов
                  </p>
                )}
                {errors?.lastName?.type === 'pattern' && (
                  <p className="asterisk">Недопустимые символы</p>
                )}
              </div>
              <div className="flex-item item-firstName">
                <label htmlFor="firstName">
                  Имя<span className="asterisk"> *</span>
                </label>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Антон"
                  id="firstName"
                  {...register('firstName', {
                    required: true,
                    maxLength: 20,
                    pattern: /^[А-Я][а-я]+$/i,
                  })}
                />
                {errors?.firstName?.type === 'required' && (
                  <p className="asterisk">Обязательно для заполнения</p>
                )}
                {errors?.firstName?.type === 'maxLength' && (
                  <p className="asterisk">
                    Превышена допустимая длина 20 символов
                  </p>
                )}
                {errors?.firstName?.type === 'pattern' && (
                  <p className="asterisk">Недопустимые символы</p>
                )}
              </div>
              <div className="flex-item item-datepicker">
                <label htmlFor="datepicker">Дата рождения</label>
                <Controller
                  name="birthdate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Datepicker field={field} />}
                />
              </div>
            </div>
            <div className="flex-item item-patronymic">
              <label htmlFor="patronymic">Отчество</label>
              <input
                className="input-style"
                type="text"
                placeholder="Сергеевич"
                {...register('patronymic', {
                  required: true,
                  pattern: /^[А-Я][а-я]+$/i,
                })}
              />
            </div>
          </div>
          <div className="flex-container">
            <div>
              <div className="flex-item item-password">
                <label>
                  Пароль<span className="asterisk"> *</span>
                </label>
                <input
                  className="custom-password input-style"
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                />
                {errors?.password?.type === 'required' && (
                  <p className="attention">Обязательно для заполнения</p>
                )}
              </div>
              <div className="flex-item item-email">
                <label htmlFor="email">
                  E-mail<span className="asterisk"> *</span>
                </label>
                <input
                  className="input-style"
                  type="email"
                  id="email"
                  placeholder="example@example.com"
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  })}
                />
                {errors?.email?.type === 'required' && (
                  <p className="attention">Обязательно для заполнения</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex-item item-repeat-password">
                <label>
                  Повторить пароль<span className="asterisk"> *</span>
                </label>
                <input
                  type="password"
                  className="custom-password input-style"
                />
              </div>
              <div className="flex-item item-tel">
                <label htmlFor="phoneNumber">Телефон</label>
                <input
                  className="input-style"
                  type="tel"
                  placeholder="+7(999)888-77-66"
                  {...register('phoneNumber', {
                    required: true,
                    pattern: /^[0-9]+$/i,
                  })}
                />
                {errors?.phoneNumber?.type === 'pattern' && (
                  <p className="attention">Введите данные корректно</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="warning-validation">
          <span className="attention">* </span>
          Поля обязательные для заполнения
        </p>
        <div className="buttons">
          <Button
            text={'Зарегистрироваться'}
            type={ButtonType.submit}
            model={ButtonModel.Colored}
          ></Button>
          <Button
            text={'Oтмена'}
            type={ButtonType.reset}
            model={ButtonModel.Text}
            width={`190`}
          ></Button>
        </div>
        <div className="flex-container">
          <CheckboxBtn
            data={{
              name: 'policy',
              value: 0,
              text: '',
            }}
          />
          <label htmlFor="policy" id="policy-label">
            Настоящим подтверждаю, что я ознакомлен <br />и согласен с условиями
            политики конфиденциальности
          </label>
        </div>
      </form>
    </div>
  );
};
