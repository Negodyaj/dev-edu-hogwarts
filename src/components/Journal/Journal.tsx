import React from 'react';
import './Journal.scss';
import './swiperStyles.scss';
import { useState } from 'react';
import SwiperCore from 'swiper';
import { useLocation } from 'react-router-dom';
import { AttendanceRatingColumn } from './components/AttendanceRatingColumn';
import { useDispatch } from 'react-redux';
import { AttendanceHead } from './components/AttendanceHead';
import { GeneralProgressHead } from './components/GeneralProgressHead';
import { AttendanceScrollContent } from './components/AttendanceScrollContent';
import { GeneralProgressScrollContent } from './components/GeneralProgressScrollContent';

type JournalProps = {
  filteredData: any;
  filter: any;
};

export const Journal = ({ filteredData, filter }: JournalProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [firstSwiper, setFirstSwiper] = useState<SwiperCore>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperCore>();

  const filterName = (element: HTMLButtonElement) => {
    // debugger;
    if (element.dataset.sortName === 'reset') {
      dispatch(filter(filteredData.sort((a: any, b: any) => a.LastName.localeCompare(b.LastName))));
    } else {
      dispatch(filter(filteredData.sort((a: any, b: any) => a.name.localeCompare(b.name))));
    }
  };

  return (
    <div className="flex-container journal-content-container">
      <div className="list-container">
        <div
          className={`one-block students-list${
            location.pathname !== '/journal' ? ' tall-header-block' : ''
          }`}
        >
          <b>ФИО студента</b>
        </div>
        <div className="one-block students-list">
          {location.pathname !== '/journal' && (
            <button
              className="btn btn-text"
              onClick={(e) => filterName(e.currentTarget)}
              data-sort-name="reset"
            >
              Сбросить сортировку
            </button>
          )}
        </div>
        {filteredData.map((student: any) => (
          <div
            key={student.id}
            className="one-block students-list"
          >{`${student.LastName} ${student.name}`}</div>
        ))}
        {location.pathname === '/journal' && <div className="one-block students-list">ВСЕГО</div>}
      </div>
      {location.pathname === '/journal' && <AttendanceRatingColumn data={filteredData} />}
      <div className="scroll-content-div">
        {location.pathname === '/journal' ? (
          <AttendanceHead setState={setSecondSwiper} control={firstSwiper} />
        ) : (
          <GeneralProgressHead setState={setSecondSwiper} control={firstSwiper} />
        )}
        {location.pathname === '/journal' ? (
          <AttendanceScrollContent setState={setFirstSwiper} control={secondSwiper} />
        ) : (
          <GeneralProgressScrollContent setState={setFirstSwiper} control={secondSwiper} />
        )}
      </div>
    </div>
  );
};
