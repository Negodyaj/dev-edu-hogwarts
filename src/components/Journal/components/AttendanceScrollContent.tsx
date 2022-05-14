import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Scrollbar } from 'swiper';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { AttendanceTypes } from '../../../models/JournalModels';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';

export type SwiperProps = {
  control?: SwiperCore;
  setState: React.Dispatch<React.SetStateAction<SwiperCore | undefined>>;
};

export const AttendanceScrollContent = ({ control, setState }: SwiperProps) => {
  const { attendanceData, filteredStudentList } = useSelector(
    (state: AppState) => state.attendanceJournalState
  );
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const enteringStudentAttendance = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      // baseWretch().url(updateAttendanceForLesson(lesson.id, student.id, AttendanceTypes[+value]))...;
      // dispatch =)
      console.log(AttendanceTypes[+value]);
    }
  };

  return (
    <Swiper
      modules={[Controller, Scrollbar]}
      onSwiper={setState}
      slidesPerView={isCollapsed ? 7.53 : 5.04}
      allowTouchMove={false}
      scrollbar={{
        draggable: true,
        snapOnRelease: true,
        lockClass: 'lock-scrollbar',
      }}
      controller={{ control: control }}
    >
      {attendanceData?.map((item: any) => (
        <SwiperSlide key={item.id}>
          {filteredStudentList?.map((element: any) => {
            const student = item.students.find((elem: any) => elem.id === element.id);
            return (
              <input
                key={student.id}
                className="one-block list-view-input"
                defaultValue={student.check ?? 0}
                onKeyPress={(e) => enteringStudentAttendance(e)}
              />
            );
          })}
          <div className="one-block">{item.sum}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
