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
import { useNavigate } from 'react-router-dom';
import { StyledValidationError } from '../../components/styled/StyledValidationError';
import { InvisibleInput } from '../../components/styled/InvisibleInput';
import moment from 'moment';

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
  policy: boolean;
};

export const RegistrationPage = () => {
  const [check, setCheck] = useState(false);
  const [validationCheckError, setValidationCheckError] = useState('');
  const navigate = useNavigate();

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
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
      birthDate: yup
        .date()
        .min(new Date('01.01.1900'), 'Введите корректную дату')
        .max(
          new Date(`01.01.${moment().subtract(14, 'years').format('YYYY')}`),
          'Введите корректную дату'
        )
        .required('Введите корректную дату'),
      phoneNumber: yup
        .string()
        .notRequired()
        .matches(/^[0-9-]+$/, 'Введите номер в формате 8-ххх-ххх-хх-хх'),
      policy: yup
        .boolean()
        .oneOf([false], 'Необходимо принять условия политики конфиденциальности'),
    });

  const method = useForm<RegisterFormData>({
    resolver: yupResolver(schema()),
    defaultValues: {
      policy: false,
    },
  });
  const {
    formState: { errors },
  } = method;
  const { isLoading, errorMessage } = useSelector(
    (state: AppState) => state.registrationPageState as RegistrationPageState
  );
  const dispatch = useDispatch();
  const onSubmit = (data: RegisterFormData) => {
    debugger;
    if (!data.policy) {
      return;
    }
    dispatch(onRegistration(data));

    if (!errorMessage) {
      navigate('/login');
    }
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
                register={method.register}
                name={'lastName'}
                type={'text'}
                placeholder="Ефременков"
              />
              <StyledValidationError>{errors.lastName?.message}</StyledValidationError>
            </div>
            <div className="form-grid-container">
              <div className="form-element">
                <label htmlFor="firstName">
                  Имя<span className="asterisk">*</span>
                </label>
                <Input
                  register={method.register}
                  name={'firstName'}
                  type={'text'}
                  placeholder="Антон"
                />
                <StyledValidationError>{errors.firstName?.message}</StyledValidationError>
              </div>
              <div className="form-element">
                <label htmlFor="patronymic">Отчество</label>
                <Input
                  register={method.register}
                  name={'patronymic'}
                  type={'text'}
                  placeholder="Сергеевич"
                />
                <StyledValidationError>{errors.patronymic?.message}</StyledValidationError>
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
                <StyledValidationError>{errors.birthDate?.message}</StyledValidationError>
              </div>
            </div>
            <div className="form-grid-container">
              <div className="form-element">
                <label htmlFor="password">
                  Пароль<span className="asterisk">*</span>
                </label>
                <Input register={method.register} name={'password'} type={'password'} />
                <StyledValidationError>{errors.password?.message}</StyledValidationError>
              </div>
              <div className="form-element">
                <label htmlFor="repeat-password">
                  Повторить пароль<span className="asterisk">*</span>
                </label>
                <Input
                  // customClassName="custom-password"
                  register={method.register}
                  name={'confirmPassword'}
                  type={'password'}
                />
                <StyledValidationError>{errors.confirmPassword?.message}</StyledValidationError>
              </div>
            </div>
            <div className="form-grid-container">
              <div className="form-element">
                <label htmlFor="email">
                  E-mail<span className="asterisk">*</span>
                </label>
                <Input
                  register={method.register}
                  name={'email'}
                  type={'email'}
                  placeholder="example@example.com"
                />
                <StyledValidationError>{errors.email?.message}</StyledValidationError>
              </div>
              <div className="form-element">
                <label htmlFor="phoneNumber">Телефон</label>
                <Input
                  register={method.register}
                  name={'phoneNumber'}
                  type={'tel'}
                  placeholder="8(999)888-77-66"
                />
                <StyledValidationError>{errors.phoneNumber?.message}</StyledValidationError>
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
                onClick={() => {
                  if (!check) {
                    setValidationCheckError(
                      'Необходимо принять условия политики конфиденциальности'
                    );
                  } else {
                    setValidationCheckError('');
                  }
                }}
                type={ButtonType.submit}
                width="238"
              />
              <Button
                text="Отмена"
                onClick={() => navigate(-1)}
                model={ButtonModel.Text}
                type={ButtonType.reset}
                width="190"
              />
            </div>
            <InvisibleInput
              type="checkbox"
              checked={check}
              value={`${check}`}
              {...method.register('policy', { required: true })}
            />
            <div className="flex-container">
              <CheckboxBtn
                data={{
                  value: 0,
                  text: '',
                  isChecked: check,
                }}
                onClick={() => {
                  setCheck(!check);
                  setValidationCheckError('');
                }}
                name="policy"
                isSingle={true}
                required={true}
              />
              <label htmlFor="policy" id="policy-label">
                Настоящим подтверждаю, что я ознакомлен <br />и согласен с условиями{' '}
                <a href={'#'} className="link-policy" aria-label="policy">
                  политики конфиденциальности
                </a>
              </label>
            </div>
            <StyledValidationError>
              {validationCheckError ? validationCheckError : errors.policy?.message}
            </StyledValidationError>
          </form>
        </div>
      </FormProvider>
    </>
  );
};
