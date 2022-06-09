import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectTabCoursePage } from '../../actions/courses.actions';
import { AppState } from '../../store/store';
import './LinkWithUnderline.scss';

export type LinkWithUnderlineProps = {
  text: string;
  path: string;
};

export const LinkWithUnderline = (props: LinkWithUnderlineProps) => {
  const { currentCourse } = useSelector((state: AppState) => state.coursesPageState);
  const dispatch = useDispatch();
  return (
    <Link
      to={`/${props.path}`}
      className="link-with-text-decoration"
      onClick={() => dispatch(selectTabCoursePage(currentCourse!.id))}
    >
      {props.text}
    </Link>
  );
};
