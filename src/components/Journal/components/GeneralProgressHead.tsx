import SwiperCore, { Controller, Scrollbar } from 'swiper';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';

export type SwiperProps = {
  control?: SwiperCore;
  setState: React.Dispatch<React.SetStateAction<SwiperCore | undefined>>;
};

export const GeneralProgressHead = ({ control, setState }: SwiperProps) => {
  const { progressData } = useSelector((state: AppState) => state.generalProgressState);
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const headTitle = (item: string) => {
    const wordsClip = item.slice(0, 26);
    if (wordsClip.length >= 23) {
      const wordsBreak = wordsClip.split(' ');
      return (
        <>
          <b>{wordsBreak[0].length >= 12 ? wordsClip.slice(0, 13) : wordsBreak[0]}</b>
          <b>
            {wordsBreak[0].length > 12
              ? wordsClip.slice(13, 24)
              : wordsBreak[1].length < 12
              ? wordsBreak[1]
              : wordsBreak[1].slice(0, 10)}
            ...
          </b>
        </>
      );
    } else {
      return <b className="text-overflow-wrap">{wordsClip}</b>;
    }
  };

  return (
    <Swiper
      modules={[Controller, Scrollbar]}
      onSwiper={setState}
      className="first-swiper"
      slidesPerView={isCollapsed ? 5.25 : 3.52}
      allowTouchMove={false}
      scrollbar={{
        draggable: true,
        snapOnRelease: true,
        lockClass: 'lock-scrollbar',
      }}
      controller={{ control: control }}
    >
      {progressData &&
        progressData[0].homeworks.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="one-block tall-header-block block-column">
              <span>{item.homework.startDate}</span>
              {headTitle(item.homework.task.name)}
            </div>
            <div className="one-block block-column" />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
