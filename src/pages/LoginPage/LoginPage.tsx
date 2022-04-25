import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../services/auth.service';
import { baseWretch } from '../../services/base-wretch.service';
import { loginUrl } from '../../shared/consts';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { AppState } from '../../store/store';
import { UserResponse } from '../../models/responses/UserResponse';
import { setCurrentUser } from '../../actions/login.actions';
import { loadGroups } from '../../actions/newHomeworkForm.action';
import { loadHomeworkPageTabs } from '../../actions/homeworks.actions';

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [course] = useState<any>({});

  const onSubmit = async (data: LoginFormData) => {
    await baseWretch()
      .url(loginUrl)
      .post(data)
      .text((token: string) => {
        setToken(token);
      });
    await baseWretch()
      .url(`api/Users/self`)
      .get()
      .json((res) => {
        const user = res as UserResponse;
        dispatch(setCurrentUser(user));
        dispatch(loadGroups(user.groups));
        dispatch(loadHomeworkPageTabs(user.groups));
      });
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
