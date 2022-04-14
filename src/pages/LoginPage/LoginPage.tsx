import { url } from "inspector";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/login.actions";
import { UserResponse } from "../../models/responses/UserResponse";
import { setToken } from "../../services/auth.service";
import { baseWretch } from "../../services/base-wretch.service"
import { loginUrl } from "../../shared/consts";
import { AppState } from "../../store/store";

export type LoginFormData = {
  email: string
  password: string
}

export const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [course, setCourse] = useState<any>({});

  
  // useEffect(() => {
  //   baseWretch()
  //   .url('api/Courses/1/simple')
  //   .get()
  //   .json((data: any) => setCourse(data))
  // }, []);
  
  const logIn = (data: LoginFormData) => baseWretch()
    .url(loginUrl)
    .post(data)
    .text((token: string) =>{ setToken(token);});


  const onSubmit=(data:LoginFormData)=>{
    logIn(data);
  }

 const {  email,password } = useSelector((state: AppState) => state.loginPageState);
  return (
    <>
    { course.name }
      <br /><br /><br /><br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="example@mail.ru" {...register("email", { required: true })} defaultValue={email} />
        {errors.email && <span>вы не указали почту</span>}
        <br />
        <input type={"password"} {...register("password", { required: true })} defaultValue={password} />
        {errors.password && <span>пароль введи, жопошник</span>}
        <br />
        <button type="submit">Вход</button>
      </form>
    </>
  );
}
