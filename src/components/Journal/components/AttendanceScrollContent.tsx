import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Scrollbar } from 'swiper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
// import { AttendanceTypes } from '../../../models/JournalModels';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
import { FilterItem, FilterList } from '../../FilterList/FilterList';
import { setStudentAttendance } from '../../../actions/attendanceJournal.actions';
import { attendanceTypesFilter } from '../../../models/JournalModels';

export type SwiperProps = {
  control?: SwiperCore;
  setState: React.Dispatch<React.SetStateAction<SwiperCore | undefined>>;
};

export const AttendanceScrollContent = ({ control, setState }: SwiperProps) => {
  const dispatch = useDispatch();
  const { attendanceData, filteredStudentList } = useSelector(
    (state: AppState) => state.attendanceJournalState
  );
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const updateStudentAttendance = (lesson: any, student: any, filterItem: FilterItem) => {
    // baseWretch().url(updateAttendanceForLesson(lesson.id, student.id, AttendanceTypes[filterItem.id]))...;
    dispatch(
      setStudentAttendance({ id: lesson.id, student: { ...student, check: filterItem.id } })
    );
  };

  return (
    <Swiper
      modules={[Controller, Scrollbar]}
      onSwiper={setState}
      slidesPerView={isCollapsed ? 10.5 : 8.5}
      allowTouchMove={false}
      scrollbar={{
        draggable: true,
        snapOnRelease: true,
        lockClass: 'lock-scrollbar',
      }}
      controller={{ control: control }}
      initialSlide={attendanceData?.length}
    >
      {attendanceData?.map((item: any) => (
        <SwiperSlide key={item.id}>
          {filteredStudentList?.map((element: any) => {
            const student = item.students.find((elem: any) => elem.id === element.id);
            const bindingCallback = updateStudentAttendance.bind(null, item, student);
            return (
              <div className="one-block journal-filter-item" key={element.id}>
                <FilterList
                  data={attendanceTypesFilter}
                  callback={bindingCallback}
                  arrowHidden={true}
                  selected={student.check}
                />
              </div>
            );
          })}
          <div className="one-block">{item.sum}</div>
        </SwiperSlide>
      ))}

      <SwiperSlide />
    </Swiper>
  );
};
