import './GradeBookGrid.scss';
import './swiperStyles.scss';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Scrollbar } from 'swiper';

export const GradeBookGrid = () => {
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
      students: [
        {
          name: 'First',
          check: 1,
        },
        {
          name: 'Second',
          check: 1,
        },
        {
          name: 'Thirst',
          check: 1,
        },
      ],
    },
    {
      lesson: '11.10.10',
      students: [
        {
          name: 'First',
          check: 1,
        },
        {
          name: 'Second',
          check: 1,
        },
        {
          name: 'Thirst',
          check: 1,
        },
      ],
    },
    {
      lesson: '12.10.10',
      students: [
        {
          name: 'First',
          check: 0,
        },
        {
          name: 'Second',
          check: 1,
        },
        {
          name: 'Thirst',
          check: 1,
        },
      ],
    },
    {
      lesson: '13.10.10',
      students: [
        {
          name: 'First',
          check: 1,
        },
        {
          name: 'Second',
          check: 0.5,
        },
        {
          name: 'Thirst',
          check: 0,
        },
      ],
    },
    {
      lesson: '14.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '15.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '16.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '17.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '18.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '19.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '20.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '21.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '22.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '23.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
    {
      lesson: '24.10.10',
      students: [
        {
          name: 'First',
          check: 0.5,
        },
        {
          name: 'Second',
          check: 0,
        },
        {
          name: 'Thirst',
          check: 0.5,
        },
      ],
    },
  ];
  const [firstSwiper, setFirstSwiper] = useState<SwiperCore>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperCore>();

  return (
    <>
      <div className="content-div">
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
              <div className="one-block">{item.lesson}</div>
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
                <div className="one-block">{student.check}</div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
