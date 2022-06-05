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
import { loginUrl } from '../../shared/consts';

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
  const [invisible, toggleInvisible] = useState('invisible');

  const schema = () =>
    yup.object().shape({
      lastName: yup
        .string()
        .required('Обязательно для заполнения')
        .matches(/^[aA-zZаА-яЯ\s]+$/, 'Недопустимые символы')
        .max(20, 'Превышена допустимая длина 20 символов'),
      firstName: yup
        .string()
        .required('Обязательно для заполнения')
        .matches(/^[aA-zZаА-яЯ\s]+$/, 'Недопустимые символы')
        .max(20, 'Превышена допустимая длина 20 символов'),
      patronymic: yup
        .string()
        .matches(/^[aA-zZаА-яЯ\s]+$/, { message: 'Недопустимые символы', excludeEmptyString: true })
        .min(0)
        .max(20, 'Превышена допустимая длина 20 символов'),
      email: yup.string().required('Обязательно для заполнения').email('Недопустимые символы'),
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
        .max(new Date('01.01.2021'), 'Введите корректную дату')
        .required('Введите корректную дату'),
      phoneNumber: yup
        .string()
        .notRequired()
        .matches(/^[0-9]+$/, 'Введите номер в формате 8-ххх-ххх-хх-хх'),
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
              <input
                type="text"
                className="form-input"
                placeholder="Ефременков"
                id="lastName"
                {...method.register('lastName')}
              />
              <p className="attention">{errors.lastName?.message}</p>
            </div>
            <div className="form-grid-container">
              <div className="form-element">
                <label htmlFor="firstName">
                  Имя<span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Антон"
                  id="firstName"
                  {...method.register('firstName')}
                />
                <p className="attention">{errors.firstName?.message}</p>
              </div>
              <div className="form-element">
                <label htmlFor="patronymic">Отчество</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Сергеевич"
                  {...method.register('patronymic')}
                />
                <p className="attention">{errors.patronymic?.message}</p>
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
                <input
                  type="password"
                  className="custom-password form-input"
                  {...method.register('password')}
                />
                <p className="attention">{errors.password?.message}</p>
              </div>
              <div className="form-element">
                <label htmlFor="repeat-password">
                  Повторить пароль<span className="asterisk">*</span>
                </label>
                <input
                  type="password"
                  className="custom-password form-input"
                  {...method.register('confirmPassword')}
                />
                <p className="attention">{errors.confirmPassword?.message}</p>
              </div>
            </div>
            <div className="form-grid-container">
              <div className="form-element">
                <label htmlFor="email">
                  E-mail<span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="example@example.com"
                  {...method.register('email')}
                />
                <p className="attention">{errors.email?.message}</p>
              </div>
              <div className="form-element">
                <label htmlFor="phoneNumber">Телефон</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="8(999)888-77-66"
                  {...method.register('phoneNumber')}
                />
                <p className="attention">{errors.phoneNumber?.message}</p>
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
                type={check ? ButtonType.submit : ButtonType.button}
                width="238"
                onClick={() => (check ? toggleInvisible('invisible') : toggleInvisible(''))}
              />
              <Button
                text="Отмена"
                url={loginUrl}
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
                  isChecked: check,
                }}
                onClick={() => {
                  setCheck(!check);
                  toggleInvisible('invisible');
                }}
                name="policy"
                isSingle={true}
              />
              <label htmlFor="policy" id="policy-label">
                Настоящим подтверждаю, что я ознакомлен <br />и согласен с условиями{' '}
                <a href={'#'} className="link-policy" aria-label="policy">
                  политики конфиденциальности
                </a>
                <p className={`attention ${invisible}`}>Нажми меня</p>
              </label>
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
};
