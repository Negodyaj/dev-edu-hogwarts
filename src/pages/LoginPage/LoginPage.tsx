import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, setToken } from '../../services/auth.service';
import { baseWretch } from '../../services/base-wretch.service';
import { loginUrl } from '../../shared/consts';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../../store/store';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { useEffect } from 'react';

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    baseWretch()
      .url(loginUrl)
      .post(data)
      .text((token: string) => {
        setToken(token);
        getCurrentUser(dispatch);
      });

    const from = location.state;
    navigate(typeof from === 'string' ? from : '/');
  };

  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
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
        {errors.email && <span>вы не указали почту</span>}
        <div className="form-element">
          Пароль
          <input
            className="form-input custom-password"
            type={'password'}
            {...register('password', { required: true })}
            defaultValue="password"
          />
        </div>
        {errors.password && <span>пароль введи, жопошник</span>}
        <div className="buttons-group">
          <Button text="Войти" model={ButtonModel.Colored} type={ButtonType.submit} width="190" />
          <Button text="Отмена" model={ButtonModel.Text} type={ButtonType.reset} width="223" />
        </div>
      </form>
    </div>
  );
};
