import './RegistrationPage.scss';
import { useForm } from 'react-hook-form';
import { setToken } from '../../services/auth.service';
import { baseWretch } from '../../services/base-wretch.service';
import { registerUrl } from '../../shared/consts';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const onSubmit = (data: RegisterFormData) =>
    baseWretch()
      .url(registerUrl)
      .post({ ...data, username: 'string', birthdate: '12.12.1999', city: 1 })
      .text((token) => setToken(token));

  return (
    <div className="register-form-wrapper content-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-container-registraton-page">
          <div className="grid-column">
            <div className="grid-column-item item-lastName">
              <label htmlFor="lastName">
                Фамилия<span className="asterisk"> *</span>
              </label>
              <input
                type="text"
                placeholder="Ефременков"
                id="lastName"
                {...register('lastName', {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z]+$/i,
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
            <div className="grid-column-item item-firstName">
              <label htmlFor="firstName">
                Имя<span className="asterisk"> *</span>
              </label>
              <input
                type="text"
                placeholder="Антон"
                id="firstName"
                {...register('firstName', {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z]+$/i,
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
            <div className="grid-column-item item-datepicker">
              <label htmlFor="datepicker">Дата рождения</label>
              <input type="date" name="datepicker" id="datepicker" />
            </div>
            <div className="grid-column-item item-password">
              <label htmlFor="password">
                Пароль<span className="asterisk"> *</span>
              </label>
              <input
                type="password"
                {...register('password', {
                  required: true,
                })}
              />
              {errors?.password?.type === 'required' && (
                <p className="attention">Обязательно для заполнения</p>
              )}
            </div>
            <div className="grid-column-item item-email">
              <label htmlFor="email">
                E-mail<span className="asterisk"> *</span>
              </label>
              <input
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
            <p>
              <span className="attention">* </span>
              Поля обязательные для заполнения
            </p>
          </div>
          <div className="grid-colum item-patronymic">
            <label htmlFor="patronymic">Отчество</label>
            <input
              type="text"
              placeholder="Сергеевич"
              {...register('patronymic', {
                required: true,
              })}
            />
            <div className="flex-column">
              <label htmlFor="phoneNumber">Телефон</label>
              <input
                type="tel"
                placeholder="+7(999)888-77-66"
                {...register('phoneNumber', {
                  required: true,
                })}
              />
            </div>
            <label htmlFor="repeat-password">
              Повторить пароль<span className="asterisk"> *</span>
            </label>
            <input type="password" />
          </div>
        </div>
        <div className="buttons">
          <button className="reg-button" type="submit">
            Зарегистрироваться
          </button>
          <button className="cancel-button">Отмена</button>
        </div>
        <div className="flex-container">
          <input type="checkbox" name="policy" />
          <label htmlFor="policy" id="policy-label">
            Настоящим подтверждаю, что я ознакомлен <br />и согласен с условиями
            политики конфиденциальности
          </label>
        </div>
      </form>
    </div>
  );
};
