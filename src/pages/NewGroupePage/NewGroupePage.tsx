import "./NewGroupePage.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseWretch } from "../../services/base-wretch.service";
import { UsersUrl } from "../../shared/consts";
import { AddNewGroupUrl } from "../../shared/consts";
import { Button, ButtonModel, ButtonType } from "../../components/Button/Button";

export type GroupFormData = {
  name: string;
  teacherId: number[];
  tutorId: number[];
  courseId: 0;
  groupStatusId: "Forming";
  startDate: "2022-04-07T17:33:42.399Z";
  endDate: "2022-04-07T17:33:42.399Z";
  timetable: "string";
  paymentPerMonth: 0;
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
    if (tutors.length<8) 
    tutors.push(user);});

  let teachers:User[]=[];

  (users as User[]).forEach(user=> {
    if (user.roles.includes("Teacher"))
    if (teachers.length<8) 
    teachers.push(user);});


  useEffect(() => {
    baseWretch()
      .url(UsersUrl)
      .get()
      .json((data) => {
        setUsers(data);
      });
  }, []);


  const onSubmit = (data: GroupFormData) => {
    baseWretch()
      .url(AddNewGroupUrl)
      .post(data)
      // .text((token) => setToken(token));
  }

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
              {...register("teacherId", { required: true })}/>
              {teacher.firstName + ' ' + teacher.lastName}
              </label>))}
              {errors.teacherId && <span>Вы не выбрали преподавателя</span>}
          </div>
          <div className="tutors-list">
            <span>Тьютор:</span>
            {tutors.map((tutor)=>(
              <label>
              <input
              key={tutor.id}
              type="checkbox"
              value={tutor.id}
              {...register("tutorId", { required: true })}/>
              {tutor.firstName+' ' + tutor.lastName}
              </label>))}
              {errors.tutorId && <span>Вы не выбрали тьютора</span>}
          </div>
          {/* <button type="submit">Сохранить</button> */}
          <Button model={ButtonModel.Colored} text='Сохранить' type={ButtonType.submit}/>
          <Button model={ButtonModel.Text} text='Отмена' type={ButtonType.reset}/>
          {/* <button type="reset" >Отмена </button> */}
        </form>
      </div>
    </>
  );
};
