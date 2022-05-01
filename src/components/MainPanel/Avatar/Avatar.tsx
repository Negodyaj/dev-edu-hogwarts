import './Avatar.scss';
import { Icon } from '../../../shared/enums/Icon';
import { SvgIcon } from '../../SvgIcon/SvgIcon';
import { CurrentUserRoles } from '../Navigation/CurrentUserRoles';
import { AppState } from '../../../store/store';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { useSelector } from 'react-redux';
import { translateForRoles } from '../Navigation/CurrentUserRoles';

export type AvatarProps = {
  data: AvatarData;
};

export type AvatarData = {
  photo?: string;
  name: string;
};

export const Avatar = (props: AvatarProps) => {
  const { currentUser, currentRole } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );

  return (
    <>
      <div className="avatar-img">
        <img className="photo" src={props.data.photo}></img>
        <div className="svg-fond">
          <SvgIcon icon={Icon.Picture} />
        </div>
      </div>
      <div className="wrapper">
        <div className="avatar-name transition-styles">{props.data.name}</div>
        {currentUser && currentUser.roles.length > 1 ? (
          <CurrentUserRoles />
        ) : (
          <div className="avatar-role transition-styles">
            {translateForRoles(currentRole)}
          </div>
        )}
      </div>
    </>
  );
};
