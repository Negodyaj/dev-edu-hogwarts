import { filterStudentsList } from '../../../actions/attendanceJournal.actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { SvgArrow } from '../../SvgIcon/SvgFiles/SvgArrow';
import React from 'react';

export const AttendanceRatingColumn = ({ data }: any) => {
  const dispatch = useDispatch();
  const { filteredStudentList } = useSelector((state: AppState) => state.attendanceJournalState);

  const sortByAscending = () => {
    dispatch(
      filterStudentsList(
        filteredStudentList
          ? filteredStudentList.sort((a: any, b: any) => a.percent - b.percent)
          : []
      )
    );
  };

  const sortByDescending = () => {
    dispatch(
      filterStudentsList(
        filteredStudentList
          ? filteredStudentList.sort((a: any, b: any) => b.percent - a.percent)
          : []
      )
    );
  };

  return (
    <div className="list-container rating">
      <div className="one-block rating">
        <b>%</b>
      </div>
      <div className="one-block rating sort-buttons">
        <button className="button-style-reset" onClick={sortByDescending}>
          <SvgArrow direction="top" />
        </button>
        <button className="button-style-reset" onClick={sortByAscending}>
          <SvgArrow direction="bottom" />
        </button>
      </div>
      {data.map((student: any, index: number) => {
        const successIndicator =
          student.percent >= 85 ? 'green' : student.percent < 70 ? 'red' : 'yellow';
        return (
          <div className="one-block rating" key={index}>
            <span className={`indicator ${successIndicator}`} />
            {student.percent}%
          </div>
        );
      })}
      <div className="one-block rating" />
    </div>
  );
};
