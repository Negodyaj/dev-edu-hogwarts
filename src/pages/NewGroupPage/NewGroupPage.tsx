import "./NewGroupPage.scss";
import "../../components/InputTextarea/InputTextarea.scss";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { baseWretch } from "../../services/base-wretch.service";
import {
  Button,
  ButtonModel,
  ButtonType,
} from "../../components/Button/Button";
import { CheckboxGroup } from "../../components/CheckBoxGroup/CheckBoxGroup";
import {
  CheckboxData,
} from "../../components/CheckBoxGroup/CheckBox/Checkbox";
import { coursesUrl, groupUrl, usersUrl } from "../../shared/consts";
import { Filter, FilterList } from "../../components/FilterList/FilterList";
import { SelectList } from "../../components/SelectList/SelectList";

export type GroupFormData = {
  name: string;
  teacherIds: number[];
  tutorIds: number[];
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
};

export const NewGroupPage = () => {
  const methods = useForm<GroupFormData>({
    defaultValues: {
      teacherIds: [9, 12],
      tutorIds: [],
      // courseId: 1,
      startDate: "21.03.2000",
      endDate: "01.01.2010",
      timetable: "string",
      paymentPerMonth: 0,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    baseWretch()
    .url(coursesUrl)
      .get()
      .json((data) => {
        baseWretch()
        .url(usersUrl)
          .get()
          .json((users) => {
            setUsers(users as User[]);
            setCourses(data as Course[]);
          });
      });
  }, []);

  let tutors: User[] = [];
  let teachers: User[] = [];

  (users as User[]).forEach((user) => {
    if (user.roles.includes("Tutor") && tutors.length < 6) tutors.push(user);
    if (user.roles.includes("Teacher") && teachers.length < 6)
      teachers.push(user);
  });

  

  const newTeachers = teachers.map((teacher) => {
    let newTeacher: CheckboxData = {
      value: teacher.id,
      text: `${teacher.firstName + " " + teacher.lastName}`,
      isChecked: false
    };
    return newTeacher;
  });

  const newTutors = tutors.map((tutor) => {
    let newTutor: CheckboxData = {
      value: tutor.id,
      text: `${tutor.firstName + " " + tutor.lastName}`,
      isChecked: false
    };
    return newTutor;
  });

  const onSubmit = (data: GroupFormData) => {
    baseWretch().url(groupUrl).post(data);
  };

  return (
    <>
      <div className="editing-page">
        <h1>Новая группа</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Название</h2>
            <input
              className="textarea"
              placeholder="Введите название"
              {...register("name", { required: true })}
            />
            {errors.name && <span>Вы не указали название</span>}
            <h2>Курс</h2>
            {/* <FilterList
              data={courses}
              type=""
            />
            {errors.courseId && <span>Вы не выбрали курс</span>} */}

            <SelectList data={courses}
              type="" name="courseId" />
              {errors.courseId && <span>Вы не выбрали курс</span>}
            <div className="teachers-list">
              <h2>Преподаватель:</h2>
              <div className="list">
                <CheckboxGroup checkboxArr={newTeachers} name="teacherIds" />
              </div>
              {errors.teacherIds && <span>Вы не выбрали преподавателя</span>}
            </div>
            <div className="tutors-list">
              <h2>Тьютор:</h2>
              <div className="list">
                <CheckboxGroup
                  checkboxArr={newTutors} name="tutorIds"
                />
              </div>
              {errors.tutorIds && <span>Вы не выбрали тьютора</span>}
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
        </FormProvider>
      </div>
    </>
  );
};
