import './MainPanel.scss';
import { Avatar } from './Avatar/Avatar';
import { Navigation } from './Navigation/Navigation';
import avatarPhoto from '../images/avatar.png';
import { Exit } from './Exit/Exit';

import { Toggle } from './Toggle/Toggle';
import React, { useState } from 'react';
import { SvgLogo } from '../SvgIcon/SvgFiles/SvgLogo';
import { SvgLogoName } from '../SvgIcon/SvgFiles/SvgLogoName';
import { CollapseButton } from './CollapsButton/CollapsButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { LoginPageState } from '../../store/reducers/login.reducer';
import defaultAvatar from '../../components/images/defaultavatar.png';
import { setCurrentUserRole } from '../../actions/login.actions';
import { UserRole } from '../../shared/enums/UserRole';
//import { SelectUserRoles } from './Navigation/SelectUserRoles';

const avData = {
  photo: avatarPhoto,
  name: '',
  role: '',
};

const defaultData = {
  photo: defaultAvatar,
  name: '',
  role: '',
};
export const MainPanel = () => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const handleClick = () => {
    setIsToggled((s) => !s);
  };
  const { currentUser, userRole } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  avData.name = `${currentUser?.firstName} ${currentUser?.lastName}`;
  if (currentUser?.roles.length == 1) {
    dispatch(setCurrentUserRole(currentUser.roles[0] as UserRole));
  }
  avData.role = `${userRole}`;
  avData.photo = avatarPhoto;

  return (
    <aside
      className={`main-panel transition-styles ${
        isCollapsed ? 'collapsed' : ''
      }`}
    >
      <div className="main-panel-container ">
        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)} />
        <div className="top-part transition-styles">
          <div
            className={`logo-container flex-center transition-styles ${
              isCollapsed ? 'collapsed' : ''
            }`}
          >
            <SvgLogo />
            <SvgLogoName />
          </div>
          <div
            className={`avatar-block transition-styles ${
              isCollapsed ? 'collapsed' : ''
            }`}
          >
            {currentUser ? (
              <Avatar data={avData} />
            ) : (
              <Avatar data={defaultData} />
            )}
            {/* <div className="avatar-role transition-styles">
              {currentUser && currentUser?.roles.length > 1 ? (
                <SelectUserRoles />
              ) : (
                { userRole }
              )} */}
            {/* </div> */}
          </div>
        </div>
        <Navigation />
        <div
          className={`bottom-part transition-styles ${
            isCollapsed ? 'collapsed' : ''
          }`}
        >
          {currentUser ? <Exit /> : ''}
          <Toggle isToggled={isToggled} onClick={handleClick}></Toggle>
        </div>
      </div>
    </aside>
  );
};
