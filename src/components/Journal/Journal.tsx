import React from 'react';
import './Journal.scss';
import './swiperStyles.scss';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Scrollbar } from 'swiper';
import { FilterItem, FilterList } from '../FilterList/FilterList';
import { useLocation } from 'react-router-dom';
import { AttendanceRatingColumn } from './components/AttendanceRatingColumn';
import { AttendanceTypes } from '../../models/JournalModels';
import { useDispatch } from 'react-redux';

type JournalProps = {
  data: any;
  filteredData: any;
  filter: any;
};

export const Journal = ({ filteredData, data, filter }: JournalProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [firstSwiper, setFirstSwiper] = useState<SwiperCore>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperCore>();

  const enteringStudentAttendance = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      // baseWretch().url(updateAttendanceForLesson(lesson.id, student.id, AttendanceTypes[+value]))...;
      // dispatch =)
      console.log(AttendanceTypes[+value]);
    }
  };

  const filterName = (item: FilterItem) => {
    // debugger;
    if (item.id === 1) {
      dispatch(filter(filteredData.sort((a: any, b: any) => a.LastName.localeCompare(b.LastName))));
    } else {
      dispatch(filter(filteredData.sort((a: any, b: any) => a.name.localeCompare(b.name))));
    }
  };

  return (
    <div className="flex-container journal-content-container">
      <div className="list-container">
        <div className="one-block students-list">
          <b>ФИО студента</b>
        </div>
        <div className="one-block students-list">
          <FilterList
            data={[
              { id: 1, name: 'Сортировать по фамилии' },
              { id: 2, name: 'Сортировать по имени' },
            ]}
            cssClass="table"
            callback={filterName}
          />
        </div>
        {filteredData.map((student: any) => (
          <div
            key={student.id}
            className="one-block students-list"
          >{`${student.LastName} ${student.name}`}</div>
        ))}
        <div className="one-block students-list">ВСЕГО</div>
      </div>
      {location.pathname === '/journal' && <AttendanceRatingColumn data={filteredData} />}
      <div className="scroll-content-div">
        <Swiper
          modules={[Controller, Scrollbar]}
          onSwiper={setSecondSwiper}
          className="first-swiper"
          slidesPerView={5}
          scrollbar={{
            draggable: true,
            snapOnRelease: true,
            lockClass: 'lock-scrollbar',
          }}
          controller={{ control: firstSwiper }}
        >
          {data.map((item: any) => (
            <SwiperSlide key={item.id}>
              <div className="one-block">
                <b>{item.lesson}</b>
              </div>
              <div className="one-block" />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Controller, Scrollbar]}
          slidesPerView={5}
          onSwiper={setFirstSwiper}
          scrollbar={{ draggable: true, snapOnRelease: true }}
          controller={{ control: secondSwiper }}
        >
          {data.map((item: any) => (
            <SwiperSlide key={item.id}>
              {filteredData.map((element: any) => {
                const student = item.students.find((elem: any) => elem.name === element.name);
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
      </div>
    </div>
  );
};
