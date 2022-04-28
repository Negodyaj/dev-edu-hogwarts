import './RegistrationPage.scss';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { setToken } from '../../services/auth.service';
import { baseWretch } from '../../services/base-wretch.service';
import { registerUrl } from '../../shared/consts';
import {
  Button,
  ButtonModel,
  ButtonType,
} from '../../components/Button/Button';
import Datepicker from '../../components/Datepicker/Datepicker';
import { convertDate } from '../../shared/helpers/dateHelpers';
import { CheckboxBtn } from '../../components/CheckBoxGroup/CheckBox/CheckBox';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  birthDate: string;
  password: string;
  phoneNumber: string;
};

export const RegistrationPage = () => {
  const method = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) =>
    baseWretch()
      .url(registerUrl)
      .post({
        ...data,
        username: 'string',
        birthdate: convertDate(data.birthDate),
        city: 1,
      })
      .text((token) => setToken(token));

  return (
    <FormProvider {...method}>
      <div className="register-form-wrapper">
        <h2>Регистрация</h2>
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <div className="form-element">
            <label htmlFor="lastName">
              Фамилия
              <span className="asterisk"> *</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Ефременков"
              id="lastName"
              {...method.register('lastName', {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {method.formState.errors?.lastName?.type === 'required' && (
              <p className="asterisk">Обязательно для заполнения</p>
            )}
            {method.formState.errors?.lastName?.type === 'maxLength' && (
              <p className="asterisk">Превышена допустимая длина 20 символов</p>
            )}
            {method.formState.errors?.lastName?.type === 'pattern' && (
              <p className="asterisk">Недопустимые символы</p>
            )}
          </div>
          <div className="form-grid-container">
            <div className="form-element">
              <label htmlFor="firstName">
                Имя<span className="asterisk"> *</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Антон"
                id="firstName"
                {...method.register('firstName', {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {method.formState.errors?.firstName?.type === 'required' && (
                <p className="asterisk">Обязательно для заполнения</p>
              )}
              {method.formState.errors?.firstName?.type === 'maxLength' && (
                <p className="asterisk">
                  Превышена допустимая длина 20 символов
                </p>
              )}
              {method.formState.errors?.firstName?.type === 'pattern' && (
                <p className="asterisk">Недопустимые символы</p>
              )}
            </div>
            <div className="form-element">
              <label htmlFor="patronymic">Отчество</label>
              <input
                type="text"
                className="form-input"
                placeholder="Сергеевич"
                {...method.register('patronymic', {
                  required: true,
                  pattern: /^[А-Я][а-я]+$/i,
                })}
              />
            </div>
          </div>
          <div className="form-grid-container">
            <div className="form-element">
              <label htmlFor="datepicker">Дата рождения</label>
              <Controller
                name="birthDate"
                control={method.control}
                rules={{ required: true }}
                render={({ field }) => <Datepicker field={field} />}
              />
            </div>
          </div>
          <div className="form-grid-container">
            <div className="form-element">
              <label htmlFor="password">
                Пароль<span className="asterisk"> *</span>
              </label>
              <input
                type="password"
                className="form-input"
                {...method.register('password', {
                  required: true,
                })}
              />
              {method.formState.errors?.password?.type === 'required' && (
                <p className="attention">Обязательно для заполнения</p>
              )}
            </div>
            <div className="form-element">
              <label htmlFor="repeat-password">
                Повторить пароль<span className="asterisk"> *</span>
              </label>
              <input type="password" className="form-input" />
            </div>
          </div>
          <div className="form-grid-container">
            <div className="form-element">
              <label htmlFor="email">
                E-mail<span className="asterisk"> *</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="example@example.com"
                {...method.register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                })}
              />
              {method.formState.errors?.email?.type === 'required' && (
                <p className="attention">Обязательно для заполнения</p>
              )}
            </div>
            <div className="form-element">
              <label htmlFor="phoneNumber">Телефон</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+7(999)888-77-66"
                {...method.register('phoneNumber', {
                  required: true,
                  pattern: /^[0-9]+$/i,
                })}
              />
              {method.formState.errors?.phoneNumber?.type === 'pattern' && (
                <p className="attention">Введите данные корректно</p>
              )}
            </div>
          </div>
          <p className="warning-validation">
            <span className="attention">* </span>
            Поля обязательные для заполнения
          </p>
          <div className="buttons">
            <Button
              text="Зарегистрироваться"
              model={ButtonModel.Colored}
              type={ButtonType.submit}
              width="238"
            />
            <Button
              text="Отмена"
              model={ButtonModel.Text}
              type={ButtonType.reset}
              width="190"
            />
          </div>
          <div className="flex-container">
            <CheckboxBtn
              data={{
                value: 0,
                text: '',
                isChecked: false,
              }}
              name="policy"
              isSingle={true}
            />
            <label htmlFor="policy" id="policy-label">
              Настоящим подтверждаю, что я ознакомлен <br />и согласен с
              условиями{' '}
              <a href={'#'} className="link-policy" aria-label="policy">
                политики конфиденциальности
              </a>
            </label>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
