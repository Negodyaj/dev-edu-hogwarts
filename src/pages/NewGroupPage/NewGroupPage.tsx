import './NewGroupPage.scss';
import '../../components/InputTextarea/InputTextarea.scss';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { baseWretch } from '../../services/base-wretch.service';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { CheckboxGroup } from '../../components/CheckBoxGroup/CheckBoxGroup';
import { addUserInGroup, deleteUserFromGroup, groupByIdUrl, groupUrl } from '../../shared/consts';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { CheckboxData } from '../../components/CheckBoxGroup/CheckBox/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoursesAndUsers, loadGroup } from '../../actions/NewGroupForm.thunks';
import { AppState } from '../../store/store';
import { NewGroupFormState } from '../../store/reducers/NewGroupForm.reducer';
import { UserRole } from '../../shared/enums/UserRole';
import {
  getIdForGroup,
  getTeachersForGroup,
  getTutorsForGroup,
  resetNewGroupPage,
} from '../../actions/NewGroupForm.actions';
import { Loader } from '../HomeworksPage/HomeworkPage/Loader';
import { useParams } from 'react-router-dom';
import { Input } from '../../components/styled/Input';
import Datepicker from '../../components/Datepicker/Datepicker';
import { GroupResponse } from '../../models/responses/GroupResponse';
import { convertDate } from '../../shared/helpers/dateHelpers';
import { GroupStatus } from '../../shared/enums/GroupStatus';
import { getGroupStatusLocalName } from '../../shared/helpers/translations';
import { groupStatusEnumReverse } from '../../shared/helpers/groupStatusForEnum';

export type GroupFormData = {
  name: string;
  teacherIds: number[];
  tutorIds: number[];
  groupStatusId: number;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
  courseId: number;
  paymentsCount: number;
};

export type Course = {
  id: number;
  name: string;
};

export const paymentsCount = [
  {
    id: 1,
    name: '3',
    value: 3,
  },
  {
    id: 2,
    name: '4',
    value: 4,
  },
];
export const NewGroupPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { group, users, courses, isLoading, teacherIdsForGroup, tutorIdsForGroup } = useSelector(
    (state: AppState) => state.newGroupFormState as NewGroupFormState
  );
  // добавить useEffect, который по id задиспетчит thunk, который получит данные о группе и запишет их в стейт этой страницы

  const methods = useForm<GroupFormData>({
    // инициализировать или этими значениями, или взятыми из стейта (в случае редактирования группы)
    defaultValues: {
      name: group?.name,
      teacherIds: teacherIdsForGroup,
      tutorIds: tutorIdsForGroup,
      courseId: group?.course.id,
      groupStatusId: group?.groupStatus,
      startDate: group?.startDate,
      endDate: group?.endDate,
      timetable: group?.timetable,
      paymentPerMonth: group?.paymentPerMonth,
      paymentsCount: group?.paymentsCount ?? 3,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (id) {
      dispatch(loadGroup(+id));
    } else {
      reset();
      dispatch(resetNewGroupPage());
    }
    dispatch(loadCoursesAndUsers());
  }, [id]);

  const tutorsForCheckbox: CheckboxData[] = users
    .filter((u) => u.roles.includes(UserRole.Tutor))
    .map((tutor) => {
      const newTutor: CheckboxData = {
        value: tutor.id,
        text: `${tutor.firstName + ' ' + tutor.lastName}`,
        isChecked: false,
      };
      return newTutor;
    });

  const teachersForCheckbox: CheckboxData[] = users
    .filter((u) => u.roles.includes(UserRole.Teacher))
    .map((teacher) => {
      const newTeacher: CheckboxData = {
        value: teacher.id,
        text: `${teacher.firstName + ' ' + teacher.lastName}`,
        isChecked: false,
      };
      return newTeacher;
    });

  const GroupStatusForFilterList = [
    {
      id: GroupStatus.Forming,
      name: getGroupStatusLocalName(GroupStatus.Forming),
      value: groupStatusEnumReverse(GroupStatus.Forming),
    },
    {
      id: GroupStatus.ReadyToStudy,
      name: getGroupStatusLocalName(GroupStatus.ReadyToStudy),
      value: groupStatusEnumReverse(GroupStatus.ReadyToStudy),
    },
    {
      id: GroupStatus.InProgress,
      name: getGroupStatusLocalName(GroupStatus.InProgress),
      value: groupStatusEnumReverse(GroupStatus.InProgress),
    },
    {
      id: GroupStatus.Completed,
      name: getGroupStatusLocalName(GroupStatus.Completed),
      value: groupStatusEnumReverse(GroupStatus.Completed),
    },
  ];

  async function getDataAndGetIdOfNewGroup(data: GroupFormData) {
    if (typeof data.teacherIds === 'string') data.teacherIds = [+data.teacherIds];
    const createdGroup = await baseWretch().url(groupUrl).post(data);
    console.log(createdGroup);
    const idLastGroups: number = await baseWretch()
      .url(groupUrl)
      .get()
      .json((dataGroups) => {
        const idLast: number = (dataGroups as GroupResponse[])[dataGroups.length - 1].id;
        return idLast;
      });
    console.log(idLastGroups);
    let role = 'Teacher';
    await data.teacherIds.map((teacher) => {
      baseWretch().url(addUserInGroup(idLastGroups, teacher, role)).post();
    });
    role = 'Tutor';
    await data.tutorIds.map((tutor) => {
      baseWretch().url(addUserInGroup(idLastGroups, tutor, role)).post();
    });
    dispatch(getIdForGroup(idLastGroups));
  }

  const deleteGroup = (groupId: number) => {
    baseWretch().url(groupByIdUrl(groupId)).delete();
  };

  const onSubmit = (data: GroupFormData) => {
    if (typeof data.teacherIds === 'string') data.teacherIds = [+data.teacherIds];
    data.startDate = convertDate(data.startDate);
    data.endDate = convertDate(data.endDate);
    dispatch(getTeachersForGroup(data.teacherIds));
    dispatch(getTutorsForGroup(data.tutorIds));
    if (id) {
      baseWretch()
        .url(groupByIdUrl(+id))
        .put(data);
      const role = 'Teacher';
      if (group?.teachers.length !== 0 && teacherIdsForGroup !== data.teacherIds) {
        group?.teachers.map((teacher) => {
          baseWretch()
            .url(deleteUserFromGroup(+id, +teacher.id))
            .delete();
        });
        dispatch(getTeachersForGroup(data.teacherIds));
        teacherIdsForGroup.map((teacher) => {
          baseWretch()
            .url(addUserInGroup(+id, teacher, role))
            .post();
        });
      }
      const roleForTutor = 'Tutor';
      if (group?.tutors.length !== 0 && tutorIdsForGroup !== data.tutorIds) {
        group?.tutors.map((tutor) => {
          baseWretch()
            .url(deleteUserFromGroup(+id, +tutor.id))
            .delete();
        });
        dispatch(getTutorsForGroup(data.tutorIds));
        tutorIdsForGroup.map((tutor) => {
          baseWretch()
            .url(addUserInGroup(+id, tutor, roleForTutor))
            .post();
        });
      }
    } else {
      getDataAndGetIdOfNewGroup(data);
      reset();
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="new-group-page">
        <h2>{id ? `Редактирование группы "${group?.name}"` : 'Новая группа'}</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid-container">
              <div className="form-element with-dropdown choose-course">
                Курс:
                <FilterList
                  data={courses.map((course) => {
                    const newCourse: FilterItem = {
                      id: course.id,
                      name: course.name,
                    };
                    return newCourse;
                  })}
                  placeholder="Выберите курс"
                  selected={group?.course.id}
                  callback={(item) => setValue('courseId', item.id)}
                />
                {errors.courseId && <span>Вы не выбрали курс</span>}
              </div>
              {id && (
                <div className="form-element with-dropdown choose-status">
                  Статус группы:
                  <FilterList
                    data={GroupStatusForFilterList.map((status) => {
                      const newStatus = {
                        id: status.id,
                        name: getGroupStatusLocalName(status.id),
                      };
                      return newStatus;
                    })}
                    callback={(item) => setValue('groupStatusId', item.id)}
                    selected={group?.groupStatus}
                  />
                </div>
              )}
            </div>
            <div className="form-grid-container">
              <div className="form-element">
                Название
                <Input
                  placeholder="Введите название"
                  name={'name'}
                  register={register}
                  type="text"
                  rules={{ required: true }}
                ></Input>
                {errors.name && <span className="invalid-feedback">Вы не указали название</span>}
              </div>
              <div className="form-element">
                Расписание занятий
                <Input
                  placeholder="Введите текст"
                  defaultValue={group?.timetable}
                  register={register}
                  name="timetable"
                  rules={{ required: true }}
                  type="text"
                />
                {errors.timetable && <span>Вы не составили расписание</span>}
              </div>
            </div>
            <div className="form-element form-grid-container">
              <div>
                Дата начала занятий
                <Controller
                  name="startDate"
                  defaultValue={group?.startDate}
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => <Datepicker field={field} />}
                />
              </div>
              <div>
                Дата окончания занятий
                <Controller
                  name="endDate"
                  defaultValue={group?.endDate}
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => <Datepicker field={field} />}
                />
              </div>
            </div>
            <div className="form-element form-grid-container">
              <div className="form-element with-dropdown choose-count">
                Число платежей:
                <FilterList
                  data={paymentsCount}
                  callback={(item) => setValue('paymentsCount', item.value)}
                  selected={group?.paymentsCount}
                />
              </div>
              <div>
                Оплата за месяц
                <Input
                  type="number"
                  defaultValue={group?.paymentPerMonth}
                  placeholder="Введите сумму"
                  register={register}
                  name="paymentPerMonth"
                  rules={{ required: true, pattern: /^[ 0-9]+$/ }}
                />
                {errors.paymentPerMonth?.type === 'required' && <span>Вы не ввели сумму</span>}
                {errors.paymentPerMonth?.type === 'pattern' && (
                  <span>Проверьте корректность данных</span>
                )}
              </div>
            </div>
            <div className="teachers-list">
              <h3>Преподаватель:</h3>
              <div className="list">
                <CheckboxGroup
                  checkboxArr={teachersForCheckbox}
                  defaultValue={teacherIdsForGroup}
                  name="teacherIds"
                />
              </div>
              {errors.teacherIds && <span>Вы не выбрали преподавателя</span>}
            </div>
            <div className="tutors-list">
              <h3>Тьютор:</h3>
              <div className="list">
                <CheckboxGroup
                  checkboxArr={tutorsForCheckbox}
                  defaultValue={tutorIdsForGroup}
                  name="tutorIds"
                />
              </div>
              {errors.tutorIds && <span>Вы не выбрали тьютора</span>}
            </div>
            <div className="buttons-group">
              <Button
                model={ButtonModel.Colored}
                text="Сохранить"
                type={ButtonType.submit}
                width="190"
              />
              <Button model={ButtonModel.Text} text="Отмена" type={ButtonType.reset} />
              {id ? (
                <Button
                  model={ButtonModel.Colored}
                  text="Удалить группу"
                  type={ButtonType.button}
                  width="220"
                  onClick={() => deleteGroup(+id)}
                />
              ) : (
                <></>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
