import './RegistrationPage.scss';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import Datepicker from '../../components/Datepicker/Datepicker';
import { CheckboxBtn } from '../../components/CheckBoxGroup/CheckBox/CheckBox';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { RegistrationPageState } from '../../store/reducers/registration.reducer';
import { onRegistration } from '../../actions/registration.thunk';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/styled/Input';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  birthDate: string;
  password: string;
  phoneNumber: string;
  city: 1;
  username: string;
  confirmPassword: string;
};

export const RegistrationPage = () => {
  const [check, setCheck] = useState(false);

  const schema = () =>
    yup.object().shape({
      password: yup
        .string()
        .required('Обязательно для заполнения')
        .min(8, 'Минимальная длина - 8 знаков'),
      confirmPassword: yup
        .string()
        .required('Обязательно для заполнения')
        .min(8, 'Минимальная длина - 8 знаков')
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
      birthDate: yup
        .date()
        .min(new Date('01.01.1900'), 'Введите корректную дату')
        .max(new Date('01.01.2021'), 'Введите корректную дату'),
    });

  const method = useForm<RegisterFormData>({ resolver: yupResolver(schema()) });
  const {
    formState: { errors },
  } = method;
  const { isLoading } = useSelector(
    (state: AppState) => state.registrationPageState as RegistrationPageState
  );
  const dispatch = useDispatch();
  const onSubmit = (data: RegisterFormData) => {
    dispatch(onRegistration(data));
  };

  return (
    <>
      {isLoading && 'LOADING'}
      <FormProvider {...method}>
        <div className="register-form-wrapper">
          <h2>Регистрация</h2>
          <form onSubmit={method.handleSubmit(onSubmit)}>
            <div className="form-element">
              <label htmlFor="lastName">
                Фамилия
                <span className="asterisk">*</span>
              </label>
              <Input
                rules={{ required: true, maxLength: 20, pattern: /^[a-zа-яё]+$/i }}
                register={method.register}
                placeholder="Ефременков"
                type="text"
                name="lastName"
              ></Input>
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
                  Имя<span className="asterisk">*</span>
                </label>
                <Input
                  rules={{ required: true, maxLength: 20, pattern: /^[a-zа-яё]+$/i }}
                  register={method.register}
                  placeholder="Антон"
                  type="text"
                  name="firstName"
                ></Input>
                {method.formState.errors?.firstName?.type === 'required' && (
                  <p className="asterisk">Обязательно для заполнения</p>
                )}
                {method.formState.errors?.firstName?.type === 'maxLength' && (
                  <p className="asterisk">Превышена допустимая длина 20 символов</p>
                )}
                {method.formState.errors?.firstName?.type === 'pattern' && (
                  <p className="asterisk">Недопустимые символы</p>
                )}
              </div>
              <div className="form-element">
                <label htmlFor="patronymic">Отчество</label>
                {/* <input
                  type="text"
                  className="form-input"
                  placeholder="Сергеевич"
                  {...method.register('patronymic', {
                    required: true,
                    maxLength: 20,
                    pattern: /^[a-zа-яё]+$/i,
                  })}
                /> */}
                <Input
                  rules={{ required: true, maxLength: 20, pattern: /^[a-zа-яё]+$/i }}
                  register={method.register}
                  placeholder="Сергеевич"
                  type="text"
                  name="patronymic"
                ></Input>
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
                <p className="attention">{errors.birthDate?.message}</p>
              </div>
            </div>
            <div className="form-grid-container">
              <div className="form-element">
                <label htmlFor="password">
                  Пароль<span className="asterisk">*</span>
                </label>
                <Input register={method.register} name={'password'} type="password" />
                {/* <input
                  type="password"
                  className="custom-password form-input"
                  {...method.register('password', {})}
                /> */}
                <p className="attention">{errors.password?.message}</p>
              </div>
              <div className="form-element">
                <label htmlFor="repeat-password">
                  Повторить пароль<span className="asterisk">*</span>
                </label>
                <Input register={method.register} name={'confirmPassword'} type="password" />
                {/* <input
                  type="password"
                  className="custom-password form-input"
                  {...method.register('confirmPassword', {})}
                /> */}
                <p className="attention">{errors.confirmPassword?.message}</p>
              </div>
            </div>
            <div className="form-grid-container">
              <div className="form-element">
                <label htmlFor="email">
                  E-mail<span className="asterisk">*</span>
                </label>
                <Input
                  rules={{
                    required: true,
                    pattern:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  }}
                  register={method.register}
                  placeholder=""
                  type="email"
                  name="email"
                ></Input>
                {/* <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="example@example.com"
                  {...method.register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  })}
                /> */}
                {method.formState.errors?.email?.type === 'required' && (
                  <p className="attention">Обязательно для заполнения</p>
                )}
              </div>
              <div className="form-element">
                <label htmlFor="phoneNumber">Телефон</label>
                <Input
                  rules={{
                    required: true,
                    pattern: /^[0-9]+$/i,
                  }}
                  register={method.register}
                  placeholder="+7(999)888-77-66"
                  type="tel"
                  name="phoneNumber"
                ></Input>
                {/* <input
                  type="tel"
                  className="form-input"
                  placeholder="+7(999)888-77-66"
                  {...method.register('phoneNumber', {
                    required: true,
                    pattern: /^[0-9]+$/i,
                  })}
                /> */}
                {method.formState.errors?.phoneNumber?.type === 'pattern' && (
                  <p className="attention">Введите корректный номер</p>
                )}
              </div>
            </div>
            <p className="warning-validation">
              <span className="asterisk">*</span>
              Поля обязательные для заполнения
            </p>
            <div className="buttons-group">
              <Button
                text="Зарегистрироваться"
                model={ButtonModel.Colored}
                type={ButtonType.submit}
                width="238"
              />
              <Button text="Отмена" model={ButtonModel.Text} type={ButtonType.reset} width="190" />
            </div>
            <div className="flex-container">
              <CheckboxBtn
                data={{
                  value: 0,
                  text: '',
                  isChecked: check,
                }}
                onClick={() => setCheck(!check)}
                name="policy"
                isSingle={true}
              />
              <label htmlFor="policy" id="policy-label">
                Настоящим подтверждаю, что я ознакомлен <br />и согласен с условиями{' '}
                <a href={'#'} className="link-policy" aria-label="policy">
                  политики конфиденциальности
                  {}
                </a>
              </label>
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
};
