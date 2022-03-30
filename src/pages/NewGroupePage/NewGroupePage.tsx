import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setToken } from "../../services/auth.service";
import { baseWretch } from "../../services/base-wretch.service";
import { UsersUrl } from "../../shared/consts";
import { AddNewGroupUrl } from "../../shared/consts";
import { Button, ButtonType } from "../../components/Button/Button";

export type GroupFormData = {
  name: string;
  teacher: string;
  tutor: string;
};

export type User = {
  id: number;
  firstName: string;
  secondName: string;
  roles: string[];
};

export const NewGroupePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormData>();
  const [users, setUsers] = useState<any>([]);

  let tutors: User[];

  const getTutors = (users as User[]).forEach((user) => {
    if (user.roles.includes("tutor")) tutors.push(user);
  });

  useEffect(() => {
    baseWretch()
      .url(UsersUrl)
      .get()
      .json((data) => {
        setUsers(data);
      });
    getTutors;
  }, []);

  //   } )

  // }
  // const arrayTutors=tutors();

  // const tutors=()=> {
  //   (users as User[]).map((user) => {
  //     if (user.roles.includes('tutor'))
  //     return user;
  //   } )

  // }

  // useEffect(() => {
  //   baseWretch()
  //   .url(UsersUrl)
  //   .get()
  //   .json(data => setTutor(data))
  // }, []);

  const onSubmit = (data: GroupFormData) =>
    baseWretch()
      .url(AddNewGroupUrl)
      .post(data)
      .text((token) => setToken(token));

  return (
    <>
      <div>
        <h1>Новая группа</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>Название</span>
          <input
            placeholder="Введите название"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Вы не указали название</span>}
          <div className="teachers-list">
            <span>Преподаватель:</span>
            {tutors}
            {/* {(tutors[0] as User).firstName} */}
            {/* <label>
        <input type="checkbox">
        <span>Фамилия Имя</span>
  </label>*/}

            {/* { users[0].firstName } */}
          </div>
          <div className="tutors-list">
            <span>Тьютор:</span>
          </div>
          <button type="submit">Сохранить</button>
          <Button type={ButtonType.Text} text="Отмена" />
        </form>
      </div>
    </>
  );
};
