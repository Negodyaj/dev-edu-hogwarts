import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Scrollbar } from 'swiper';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { HomeworkStatus } from '../../../models/HomeworkCardData';
import { StudentHomeworkStatus } from '../../../models/responses/HomeworksResponse';
import { uniqueId } from 'lodash';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';

export type SwiperProps = {
  control?: SwiperCore;
  setState: React.Dispatch<React.SetStateAction<SwiperCore | undefined>>;
};

export const GeneralProgressScrollContent = ({ control, setState }: SwiperProps) => {
  const { progressData, filteredStudentList } = useSelector(
    (state: AppState) => state.generalProgressState
  );
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const getStatus = (homeworkId: any) => {
    return filteredStudentList?.map((element: any) => {
      const student = progressData?.find((elem: any) => elem.id === element.id);
      const studentHomework = student?.homeworks.find((item: any) => item.id === homeworkId);
      const status: StudentHomeworkStatus = studentHomework.status;
      return HomeworkStatus[status];
    });
  };

  return (
    <Swiper
      modules={[Controller, Scrollbar]}
      onSwiper={setState}
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
        progressData[0].homeworks.map((homework: any) => (
          <SwiperSlide key={uniqueId('swiper_')}>
            {getStatus(homework.id)?.map((status) => {
              if (status === HomeworkStatus.ToVerifyFixes) {
                return (
                  <div className="one-block block-column" key={uniqueId('status_')}>
                    <b>Проверить</b>
                    <span>правки</span>
                  </div>
                );
              } else if (status === HomeworkStatus.DoneAfterDeadline) {
                return (
                  <div className="one-block block-column" key={uniqueId('status_')}>
                    <b>Сдано</b>
                    <span>с опозданием</span>
                  </div>
                );
              } else {
                return (
                  <div className="one-block block-column" key={uniqueId('status_')}>
                    <b>{status}</b>
                  </div>
                );
              }
            })}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
