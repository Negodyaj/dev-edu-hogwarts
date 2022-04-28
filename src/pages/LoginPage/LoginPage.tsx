import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, setToken } from '../../services/auth.service';
import { baseWretch } from '../../services/base-wretch.service';
import { loginUrl } from '../../shared/consts';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { AppState } from '../../store/store';

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const dispatch = useDispatch();
  const [course] = useState<any>({});
  const logIn = (data: LoginFormData) =>
    baseWretch()
      .url(loginUrl)
      .post(data)
      .text((token: string) => {
        setToken(token);
        getCurrentUser(dispatch);
      });
  const onSubmit = (data: LoginFormData) => {
    logIn(data);
  };

  const { email, password } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  return (
    <>
      {course.name}
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="example@mail.ru"
          {...register('email', { required: true })}
          defaultValue={email}
        />
        {errors.email && <span>вы не указали почту</span>}
        <br />
        <input
          type={'password'}
          {...register('password', { required: true })}
          defaultValue={password}
        />
        {errors.password && <span>пароль введи, жопошник</span>}
        <br />
        <button type="submit">Вход</button>
      </form>
    </>
  );
};
