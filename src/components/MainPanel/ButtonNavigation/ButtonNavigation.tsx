import { Link, useMatch } from 'react-router-dom';
import './ButtonNavigation.scss';
import { SvgIcon } from '../../SvgIcon/SvgIcon';
import { NavLink } from '../Navigation/navLinksProvider';
import { useDispatch } from 'react-redux';
import { setPrevURL } from '../../../actions/homework.actions';

export type ButtonProps = {
  data: NavLink;
  isCollapsed: boolean;
};

export const ButtonNavigation = (props: ButtonProps) => {
  const dispatch = useDispatch();
  const match = useMatch({
    path: props.data.path,
    end: props.data.path.length === 1,
  });

  return (
    <Link
      onClick={() => {
        dispatch(setPrevURL(''));
      }}
      to={props.data.path}
      className={`nav-link flex-center transition-styles ${match ? 'active' : ''} ${
        props.data.customCssClass ?? ''
      } ${props.data.isSubbutton ? 'subbutton' : ''} ${
        props.data.isSubbutton && props.isCollapsed ? 'collapsed-mode' : ''
      }
      `}
    >
      <SvgIcon icon={props.data.icon} />
      <span className={`links-name transition-styles`}>{props.data.displayName}</span>
    </Link>
  );
};
