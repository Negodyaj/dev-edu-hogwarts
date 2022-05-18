import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Scrollbar } from 'swiper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
import { SvgIcon } from '../../SvgIcon/SvgIcon';
import { Icon } from '../../../shared/enums/Icon';
import { addNewLesson, setLessonDate } from '../../../actions/attendanceJournal.actions';
import { uniqueId } from 'lodash';
import moment from 'moment';

export type SwiperProps = {
  control?: SwiperCore;
  setState: React.Dispatch<React.SetStateAction<SwiperCore | undefined>>;
};

export const AttendanceHead = ({ control, setState }: SwiperProps) => {
  const dispatch = useDispatch();
  const { attendanceData } = useSelector((state: AppState) => state.attendanceJournalState);
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const updateLessonDate = (e: React.KeyboardEvent<HTMLInputElement>, lessonItem: any) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (value && /^[[\d]{2}.[\d]{2}.[\d]{2}]*$/.test(value)) {
        // wretch
        dispatch(setLessonDate({ ...lessonItem, lesson: value }));
        console.log(value);
      } else {
        e.currentTarget.value = lessonItem.lesson;
      }
    }
  };
  const createLesson = (lessonDate: string) => {
    dispatch(
      addNewLesson({
        id: uniqueId('lesson_'),
        lesson: lessonDate,
        sum: 0,
        students: [
          {
            id: 1,
            name: 'Филя',
            LastName: 'Абрикос',
          },
          {
            id: 2,
            name: 'Second',
            LastName: 'Барабан',
          },
          {
            id: 3,
            name: 'Амеба',
            LastName: 'Ворона',
          },
        ],
      })
    );
  };

  return (
    <Swiper
      modules={[Controller, Scrollbar]}
      onSwiper={setState}
      className="first-swiper"
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
          <div className="one-block">
            <b>
              <input
                key={item.lesson}
                className="one-block list-view-input"
                defaultValue={item.lesson ?? 0}
                onKeyPress={(e) => updateLessonDate(e, item)}
              />
            </b>
          </div>
          <div className="one-block" />
        </SwiperSlide>
      ))}

      <SwiperSlide>
        <div className="one-block one-block_borderless">
          <div
            className="form-input_link__button"
            onClick={() => createLesson(moment().format('DD.MM.YY'))}
          >
            <SvgIcon icon={Icon.Plus} />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
