import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setToken } from "../../services/auth.service";
import { baseWretch } from "../../services/base-wretch.service";
import { UsersUrl } from "../../shared/consts";
import { AddNewGroupUrl } from "../../shared/consts";
import { Button, ButtonType } from "../../components/Button/Button";

export type GroupFormData = {
  name: string;
  teacherId: number;
  tutorId: number;
  // teacher: string[];
  // tutor: string[];
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  roles: string[];
};

export const NewGroupePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormData>();
  const [users, setUsers] = useState<any>([]);

  let tutors: User[]=[];

  (users as User[]).forEach(user => {
    if (user.roles.includes("Tutor"))
    tutors.push(user);});

  let teachers:User[]=[];

  (users as User[]).forEach(user=> {
    if (user.roles.includes("Teacher")) 
    teachers.push(user);});

  useEffect(() => {
    baseWretch()
      .url(UsersUrl)
      .get()
      .json((data) => {
        setUsers(data);
      });
  }, []);


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
            {teachers.map((teacher)=>(
              <label>
              <input
              key={teacher.id}
              type="checkbox"
              value={teacher.id}
              {...register("teacherId", { required: 'Выберите преподавателя' })}/>
              {teacher.firstName + ' ' + teacher.lastName}
              </label>))}
          </div>
          <div className="tutors-list">
            <span>Тьютор:</span>
            {tutors.map((tutor)=>(
              <label>
              <input
              key={tutor.id}
              type="checkbox"
              value={tutor.id}
              {...register("tutorId", { required: 'Выберите тьютора' })}/>
              {tutor.firstName+' ' + tutor.lastName}
              </label>))}
          </div>
          <button type="submit">Сохранить</button>
          <Button type={ButtonType.Text} text="Отмена" />
        </form>
      </div>
    </>
  );
};
