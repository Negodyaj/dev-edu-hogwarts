import './HomeworkCard.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
// import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
// import { taskEditLink } from '../../../components/MainPanel/Navigation/constants';
// import { Link } from 'react-router-dom';
// import { setPrevURL } from '../../../actions/homework.actions';
// import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
import { Link } from 'react-router-dom';
// import { useMemo } from 'react';

export const TaskCardContent = () => {
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
      {task?.links
        ? task?.links.split(' [link] ').map((link, index) => (
            <a href={link} className="homework-useful-link" target="_blank" key={index}>
              {link}
            </a>
          ))
        : ''}
      {task && (
        <Link to={`/new-homework/edit-task/${task.id}`} className="link-with-text-decoration">
          Редактировать
        </Link>
      )}
    </>
  );
};
