import { FilterItem, FilterList } from '../../FilterList/FilterList';
import { filterStudentsList } from '../../../actions/attendanceJournal.actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';

export const AttendanceRatingColumn = ({ data }: any) => {
  const dispatch = useDispatch();
  const { filteredStudentList } = useSelector((state: AppState) => state.attendanceJournalState);

  const filterRating = (item: FilterItem) => {
    // debugger;
    if (item.id === 1) {
      dispatch(
        filterStudentsList(
          filteredStudentList
            ? filteredStudentList.sort((a: any, b: any) => a.LastName.localeCompare(b.LastName))
            : []
        )
      );
    } else if (item.id === 2) {
      dispatch(
        filterStudentsList(
          filteredStudentList
            ? filteredStudentList.sort((a: any, b: any) => a.percent - b.percent)
            : []
        )
      );
    } else if (item.id === 3) {
      dispatch(
        filterStudentsList(
          filteredStudentList
            ? filteredStudentList.sort((a: any, b: any) => b.percent - a.percent)
            : []
        )
      );
    }
  };

  return (
    <div className="list-container rating">
      <div className="one-block rating">
        <b>%</b>
      </div>
      <div className="one-block rating">
        <FilterList
          data={[
            {
              id: 1,
              name: 'Не сортировать',
            },
            {
              id: 2,
              name: 'По возрастанию',
            },
            {
              id: 3,
              name: 'По убыванию',
            },
          ]}
          cssClass="table"
          callback={filterRating}
        />
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
