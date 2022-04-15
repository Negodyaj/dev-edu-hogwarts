import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { setToken } from '../../services/auth.service';
import { baseWretch } from '../../services/base-wretch.service';
import { loginUrl } from '../../shared/consts';
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
  const [course] = useState<any>({});
  const logIn = (data: LoginFormData) =>
    baseWretch()
      .url(loginUrl)
      .post(data)
      .text((token: string) => {
        setToken(token);
      });

  const onSubmit = (data: LoginFormData) => {
    logIn(data);
  };

  const { email, password } = useSelector(
    (state: AppState) => state.loginPageState
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
