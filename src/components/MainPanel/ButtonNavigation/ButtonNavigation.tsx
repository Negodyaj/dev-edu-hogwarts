import { Link, useMatch } from 'react-router-dom';
import './ButtonNavigation.scss';
import { SvgIcon } from '../../SvgIcon/SvgIcon';
import { NavLink } from '../Navigation/navLinksProvider';

export type ButtonProps = {
  data: NavLink;
  isCollapsed: boolean;
};

export const ButtonNavigation = (props: ButtonProps) => {
  const match = useMatch({
    path: props.data.path,
    end: props.data.path.length === 1,
  });

  return (
    <Link
      to={props.data.path}
      className={`nav-link flex-center transition-styles ${match ? 'active' : ''}
       ${props.isCollapsed && props.data.isHidden ? 'subbutton with-color-on-hover' : ''} ${
        !props.isCollapsed && props.data.isHidden ? 'subbutton without-color-on-hover' : ''
      }`}
    >
      <SvgIcon icon={props.data.icon} />
      <span className={`links-name transition-styles`}>{props.data.displayName}</span>
    </Link>
  );
};
