import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../../store/store';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { authUser } from '../../actions/login.thunk';

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { errorMessage } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, 'Введен некорректный почтовый адрес')
      .required('Вы не указали почту'),
    password: yup.string().required('Введите пароль'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(validationSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data: LoginFormData) => {
    dispatch(authUser(data));
    reset({ password: '' });
  };

  const { currentUser, inProcess } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );

  useEffect(() => {
    if (currentUser) {
      const from = location.state;
      navigate(typeof from === 'string' ? from : '/');
    }
  }, [currentUser]);

  return (
    <div className="form-container login-page-form">
      <h2>Войти</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          E-mail
          <input
            className="form-input"
            placeholder="example@mail.ru"
            {...register('email', { required: true })}
          />
        </div>
        {errors.email && <div className="invalid-feedback">{errors.email?.message}</div>}
        <div className="form-element">
          Пароль
          <input
            className="form-input custom-password"
            type={'password'}
            {...register('password', { required: true })}
            defaultValue="password"
          />
        </div>
        {errors.password && <div className="invalid-feedback">{errors.password?.message}</div>}
        {errorMessage && (
          <div className="invalid-feedback">
            {errorMessage === 'Authorization exception' && 'Неправильные логин или пароль'}
          </div>
        )}
        <div className="buttons-group">
          <Button
            text="Войти"
            model={ButtonModel.Colored}
            type={ButtonType.submit}
            width="190"
            disabled={inProcess}
          />
          <Button text="Отмена" model={ButtonModel.Text} type={ButtonType.reset} width="223" />
        </div>
      </form>
    </div>
  );
};
