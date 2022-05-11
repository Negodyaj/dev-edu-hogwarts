import './Journal.scss';
import './swiperStyles.scss';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Scrollbar } from 'swiper';
import { FilterList } from '../FilterList/FilterList';

export const Journal = () => {
  // const testArr = [
  //   {
  //     student: 'First',
  //     lessons: [
  //       {
  //         lessonDate: '10.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '11.10.10',
  //         check: 0.5,
  //       },
  //       {
  //         lessonDate: '12.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '13.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '14.10.10',
  //         check: 1,
  //       },
  //     ],
  //   },
  //   {
  //     student: 'Second',
  //     lessons: [
  //       {
  //         lessonDate: '10.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '11.10.10',
  //         check: 0.5,
  //       },
  //       {
  //         lessonDate: '12.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '13.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '14.10.10',
  //         check: 1,
  //       },
  //     ],
  //   },
  //   {
  //     student: 'Thirst',
  //     lessons: [
  //       {
  //         lessonDate: '10.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '11.10.10',
  //         check: 0.5,
  //       },
  //       {
  //         lessonDate: '12.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '13.10.10',
  //         check: 1,
  //       },
  //       {
  //         lessonDate: '14.10.10',
  //         check: 1,
  //       },
  //     ],
  //   },
  // ];
  const lessonsArr = [
    {
      lesson: '10.10.10',
      sum: 3,
      students: [
        {
          name: 'First',
          check: 1,
          percent: 90,
        },
        {
          name: 'Second',
          check: 1,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 1,
          percent: 70,
        },
      ],
    },
    {
      lesson: '11.10.10',
      sum: 3,
      students: [
        {
          name: 'First',
          check: 1,
          percent: 90,
        },
        {
          name: 'Second',
          check: 1,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 1,
          percent: 69,
        },
      ],
    },
    {
      lesson: '12.10.10',
      sum: 2,
      students: [
        {
          name: 'First',
          check: 0,
          percent: 90,
        },
        {
          name: 'Second',
          check: 1,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 1,
          percent: 69,
        },
      ],
    },
    {
      lesson: '13.10.10',
      sum: 1.5,
      students: [
        {
          name: 'First',
          check: 1,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0.5,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0,
          percent: 69,
        },
      ],
    },
    {
      lesson: '14.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '15.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '16.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '17.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '18.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '19.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '20.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '21.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '22.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '23.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
    {
      lesson: '24.10.10',
      sum: 1,
      students: [
        {
          name: 'First',
          check: 0.5,
          percent: 90,
        },
        {
          name: 'Second',
          check: 0,
          percent: 50,
        },
        {
          name: 'Thirst',
          check: 0.5,
          percent: 69,
        },
      ],
    },
  ];
  const [firstSwiper, setFirstSwiper] = useState<SwiperCore>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperCore>();

  return (
    <div className="flex-row journal-content-container">
      <div className="list-container">
        <div className="one-block students-list">
          <b>ФИО студента</b>
        </div>
        <div className="one-block students-list">
          <FilterList data={[{ id: 1, name: 'Сортировать по фамилии' }]} cssClass="table" />
        </div>
        {lessonsArr[0].students.map((student) => (
          <div className="one-block students-list">{student.name}</div>
        ))}
        <div className="one-block students-list">ВСЕГО</div>
      </div>
      <div className="list-container rating">
        <div className="one-block rating">
          <b>%</b>
        </div>
        <div className="one-block rating" />
        {lessonsArr[0].students.map((student) => {
          const successIndicator =
            student.percent >= 85 ? 'green' : student.percent < 70 ? 'red' : 'yellow';
          return (
            <div className="one-block rating">
              <span className={`indicator ${successIndicator}`} />
              {student.percent}%
            </div>
          );
        })}
        <div className="one-block rating" />
      </div>
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
          {lessonsArr.map((item) => (
            <SwiperSlide>
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
          {lessonsArr.map((item) => (
            <SwiperSlide>
              {item.students.map((student) => (
                <input className="one-block list-view-input" defaultValue={student.check} />
              ))}
              <div className="one-block">{item.sum}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
