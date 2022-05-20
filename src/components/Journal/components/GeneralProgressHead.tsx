import SwiperCore, { Controller, Scrollbar } from 'swiper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
import { useNavigate } from 'react-router-dom';
import { filterStudentsList } from '../../../actions/generalProgress.actions';
import { SvgArrow } from '../../SvgIcon/SvgFiles/SvgArrow';

export type SwiperProps = {
  control?: SwiperCore;
  setState: React.Dispatch<React.SetStateAction<SwiperCore | undefined>>;
};

export const GeneralProgressHead = ({ control, setState }: SwiperProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const selectedItemInFilter = (value: number) =>
  //   activeFilter !== value ? statusTypesFilter[0] : undefined;
  const { progressData } = useSelector((state: AppState) => state.generalProgressState);
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const headTitle = (item: string) => {
    const wordsClip = item.slice(0, 26);
    if (wordsClip.length >= 23) {
      const wordsBreak = wordsClip.split(' ');
      return (
        <>
          <b>
            <p>{wordsBreak[0].length >= 12 ? wordsClip.slice(0, 13) : wordsBreak[0]}</p>
            <p>
              {wordsBreak[0].length > 12
                ? wordsClip.slice(13, 24)
                : wordsBreak[1].length < 12
                ? wordsBreak[1]
                : wordsBreak[1].slice(0, 10)}
              ...
            </p>
          </b>
        </>
      );
    } else {
      return <b className="text-overflow-wrap">{wordsClip}</b>;
    }
  };

  const sortByAscending = (homeworkId: number) => {
    dispatch(
      filterStudentsList(
        progressData
          ? progressData.sort((a: any, b: any) =>
              a.homeworks
                .find((homework: any) => homework.id === homeworkId)
                .status.localeCompare(
                  b.homeworks.find((homework: any) => homework.id === homeworkId).status
                )
            )
          : []
      )
    );
  };

  const sortByDescending = (homeworkId: number) => {
    dispatch(
      filterStudentsList(
        progressData
          ? progressData.sort((a: any, b: any) =>
              b.homeworks
                .find((homework: any) => homework.id === homeworkId)
                .status.localeCompare(
                  a.homeworks.find((homework: any) => homework.id === homeworkId).status
                )
            )
          : []
      )
    );
  };

  console.log();

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
        progressData[0].homeworks.map((item: any) => {
          const bindingSortAscending = sortByAscending.bind(null, item.id);
          const bindingSortDescending = sortByDescending.bind(null, item.id);
          return (
            <SwiperSlide key={item.id}>
              <div
                className="one-block tall-header-block block-column"
                onClick={() => navigate(`/homeworks/${item.id}`)}
              >
                <span>{item.homework.startDate}</span>
                {headTitle(item.homework.task.name)}
              </div>
              <div className="one-block block-column sort-buttons">
                <button className="button-style-reset" onClick={bindingSortAscending}>
                  <SvgArrow direction="top" />
                </button>
                <button className="button-style-reset" onClick={bindingSortDescending}>
                  <SvgArrow direction="bottom" />
                </button>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
