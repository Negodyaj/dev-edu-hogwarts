import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setToken } from "../../services/auth.service";
import { baseWretch } from "../../services/base-wretch.service"
import { loginUrl } from "../../shared/consts";

export type LoginFormData = {
  email: string
  password: string
}

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [course, setCourse] = useState<any>({});

  useEffect(() => {
    baseWretch()
    .url('api/Courses/1/simple')
    .get()
    .json(data => setCourse(data))
  }, []);

  const onSubmit = (data: LoginFormData) => baseWretch()
    .url(loginUrl)
    .post(data)
    .text(token => setToken(token)
    );



  return (
    <>
    { course.name }
      <br /><br /><br /><br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="example@mail.ru" {...register("email", { required: true })} />
        {errors.email && <span>вы не указали почту</span>}
        <br />
        <input type={"password"} {...register("password", { required: true })} />
        {errors.password && <span>пароль введи, жопошник</span>}
        <br />
        <button type="submit">Вход</button>
      </form>
    </>
  );
}