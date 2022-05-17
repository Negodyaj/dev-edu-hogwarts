import './Avatar.scss';
import { Icon } from '../../../shared/enums/Icon';
import { SvgIcon } from '../../SvgIcon/SvgIcon';
import { CurrentUserRoles } from '../Navigation/CurrentUserRoles';
import { AppState } from '../../../store/store';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { useSelector } from 'react-redux';
import { getUserRoleLocalName } from '../../../shared/helpers/translations';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
import { Link } from 'react-router-dom';

export type AvatarProps = {
  data: AvatarData;
};

export type AvatarData = {
  photo?: string;
  firstName: string;
  lastName: string;
};

export const Avatar = (props: AvatarProps) => {
  const { currentUser, currentRole } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  return (
    <>
      <Link to={currentUser ? `/settings` : `/login`}>
        <div className="avatar-img">
          <img className="photo" src={`./static${props.data.photo}`} />
          <div className="svg-fond">
            <SvgIcon icon={Icon.Picture} />
          </div>
        </div>
      </Link>
      <div className="user-info-wrapper">
        <Link to={currentUser ? `/settings` : `/login`}>
          <span className="avatar-name margin-right-avatar transition-styles">
            {props.data.lastName}
          </span>
          <span className="avatar-name transition-styles">{props.data.firstName}</span>
        </Link>
        <div className="user-roles-wrapper">
          {currentUser && currentUser.roles.length > 1 && !isCollapsed ? (
            <CurrentUserRoles />
          ) : (
            <div className="avatar-role transition-styles">{getUserRoleLocalName(currentRole)}</div>
          )}
        </div>
      </div>
    </>
  );
};
