import "./NewGroupPage.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseWretch } from "../../services/base-wretch.service";
import { usersUrl } from "../../shared/consts";
import { groupUrl } from "../../shared/consts";
import { coursesUrl } from "../../shared/consts";
import { Button, ButtonModel, ButtonType } from "../../components/Button/Button";
import { CheckboxGroup } from "../../components/CheckBoxGroup/CheckBoxGroup";
import { CheckboxBtn, CheckboxData } from "../../components/CheckBoxGroup/CheckBox/Checkbox";

export type GroupFormData = {
  name: string;
  teacherId: number[];
  tutorId: number[];
  groupStatusId: string;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
  courseId: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  roles: string[];
};



export type Course = {
  id: number;
  name: string;
  description: string;
};

export const NewGroupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormData>({
    defaultValues: {
      startDate: "21.03.2000",
      endDate: "01.01.2010",
      timetable: "string",
      paymentPerMonth: 0,
    },
  });
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  let tutors: User[] = [];
  let teachers: User[] = [];

  (users as User[]).forEach((user) => {
    if (user.roles.includes("Tutor") && tutors.length < 6) tutors.push(user);
    if (user.roles.includes("Teacher") && teachers.length < 6)
      teachers.push(user);
  });

  useEffect(() => {
    baseWretch()
      .url(usersUrl)
      .get()
      .json((data) => {
        setUsers(data as User[]);
      });
    baseWretch()
      .url(coursesUrl)
      .get()
      .json((data) => {
        setCourses(data as Course[]);
      });
  }, []);

  const onSubmit = (data: GroupFormData) => {
    baseWretch().url(groupUrl).post(data);
  };

let newTeachers: CheckboxData[]=[];
let newTutors: CheckboxData[]=[];

teachers.map((teacher)=>{
  let newTeacher= {
  name: "teacher",
  value: teacher.id,
  text:  `${teacher.firstName + " " + teacher.lastName}`}
 newTeachers.push(newTeacher)}
);

tutors.map((tutor)=>{
  let newTutor= {
  name: "tutor",
  value: tutor.id,
  text:  `${tutor.firstName + " " + tutor.lastName}`}
 newTutors.push(newTutor)}
);

  return (
    <>
      <div className="editing-page">
        <h1>Новая группа</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Название</h2>
          <input
            placeholder="Введите название"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Вы не указали название</span>}
          <h2>Выберите курс</h2>
          <select {...register("courseId", { required: true })}>
            {courses.map((course) => (
              <option value={course.id}>{course.name}</option>
            ))}
          </select>
          {errors.courseId && <span>Вы не выбрали курс</span>}
          <div className="teachers-list">
            <h2>Преподаватель:</h2>
            <div className="list">
                <CheckboxGroup checkboxArr={newTeachers} 
                {...register("teacherId", { required: true })} />
                {errors.teacherId && <span>Вы не выбрали преподавателя</span>}
             </div>
          </div>
          <div className="tutors-list">
            <h2>Тьютор:</h2>
            <div className="list">
            <CheckboxGroup checkboxArr={newTutors}
              {...register("tutorId", { required: true })}/>
              {errors.tutorId && <span>Вы не выбрали тьютора</span>}
            </div>
          </div>
          <div className="default-value">
            <input {...register("groupStatusId")} />
            <input {...register("startDate")} />
            <input {...register("endDate")} />
            <input {...register("timetable")} />
            <input {...register("paymentPerMonth")} />
          </div>
          <Button
            model={ButtonModel.Colored}
            text="Сохранить"
            type={ButtonType.submit}
            width="190px"
          />
          <Button
            model={ButtonModel.Text}
            text="Отмена"
            type={ButtonType.reset}
          />
        </form>
      </div>
    </>
  );
};

