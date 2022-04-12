import "./NewGroupePage.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseWretch } from "../../services/base-wretch.service";
import { UsersUrl } from "../../shared/consts";
import { AddNewGroupUrl } from "../../shared/consts";
import { Button, ButtonModel, ButtonType } from "../../components/Button/Button";
import moment from "moment";

export type GroupFormData = {
  name: string;
  teacherId: number[];
  tutorId: number[];
  groupStatusId: string;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
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
  } = useForm<GroupFormData>({
    defaultValues: {
      groupStatusId: "Forming",
      startDate: "21.03.2000",
      endDate: "01.01.2010",
      timetable: "string",
      paymentPerMonth: 0
    }
  });
  const [users, setUsers] = useState<any>([]);

  let tutors: User[]=[];

  (users as User[]).forEach(user => {
    if (user.roles.includes("Tutor"))
    if (tutors.length<6) 
    tutors.push(user);});

  let teachers:User[]=[];

  (users as User[]).forEach(user=> {
    if (user.roles.includes("Teacher"))
    if (teachers.length<6) 
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
  }

  return (
    <>
      <div>
        <h1>Новая группа</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Название</h2>
          <input
            placeholder="Введите название"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Вы не указали название</span>}
          <div className="teachers-list">
            <h2>Преподаватель:</h2>
            <div className="list">
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
          </div>
          <div className="tutors-list">
            <h2>Тьютор:</h2>
            <div className="list">
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
          </div>
          <div className="default-value">
            <input {...register("groupStatusId")}/>
            <input {...register("startDate")}/>
            <input {...register("endDate")}/>
            <input {...register("timetable")}/>
            <input {...register("paymentPerMonth")}/>
          </div>
          <Button model={ButtonModel.Colored} text='Сохранить' type={ButtonType.submit} width='190px'/>
          <Button model={ButtonModel.Text} text='Отмена' type={ButtonType.reset}/>
        </form>
      </div>
    </>
  );
};
