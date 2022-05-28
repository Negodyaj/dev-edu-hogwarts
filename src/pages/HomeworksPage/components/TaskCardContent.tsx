import './HomeworkCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
// import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
import { newHomeworkLink } from '../../../components/MainPanel/Navigation/constants';
import { Link } from 'react-router-dom';
import { setPrevURL } from '../../../actions/homework.actions';
// import { useMemo } from 'react';

export const TaskCardContent = () => {
  const dispatch = useDispatch();
  const setPrev = () => {
    dispatch(setPrevURL(location.pathname));
  };
  const { task } = useSelector((state: AppState) => state.homeworkPageState);
  return (
    <>
      <span className="homework-description-title">Описание задания</span>
      {task?.description.split('\n').map((par, index) => (
        <p className="homework-card__description" key={index}>
          {par}
        </p>
      ))}
      {task?.links && <span className="homework-description-title">Полезные ссылки</span>}
      {task?.links.split(' [link] ').map((link, index) => (
        <a href={link} className="homework-useful-link" target="_blank" key={index}>
          {link}
        </a>
      ))}
      {task && (
        <Link to={`..${newHomeworkLink}`} className="link-with-text-decoration" onClick={setPrev}>
          Редактировать
        </Link>
      )}
      <span className="homework-description-title">Результат выполненного задания:</span>
    </>
  );
};
