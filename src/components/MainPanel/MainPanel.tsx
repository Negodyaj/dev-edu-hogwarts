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
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { collapseMainPanel } from '../../actions/mainPanel.actions';

const avData = {
  photo: avatarPhoto,
  name: '',
};

const defaultData = {
  photo: defaultAvatar,
  name: '',
};
export const MainPanel = () => {
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const handleClick = () => {
    setIsToggled((s) => !s);
  };
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);

  avData.name = `${currentUser?.firstName} ${currentUser?.lastName}`;
  avData.photo = avatarPhoto;

  return (
    <aside className={`main-panel transition-styles ${isCollapsed ? 'collapsed' : ''}`}>
      <CollapseButton onClick={() => dispatch(collapseMainPanel(!isCollapsed))} />
      <div className="main-panel-container ">
        <div className={`top-part transition-styles ${!currentUser ? 'top-part-login' : ''}`}>
          <div
            className={`logo-container flex-center transition-styles ${
              isCollapsed ? 'collapsed' : ''
            }`}
          >
            <SvgLogo />
            <SvgLogoName />
          </div>
          <div
            className={`avatar-block transition-styles ${isCollapsed ? 'collapsed' : ''}${
              !currentUser ? 'padding-top' : ''
            }`}
          >
            {currentUser ? <Avatar data={avData} /> : <Avatar data={defaultData} />}
          </div>
        </div>
        <Navigation isCollapsed={isCollapsed} />
        <div className={`bottom-part transition-styles ${isCollapsed ? 'collapsed' : ''}`}>
          {currentUser ? <Exit /> : ''}
          <Toggle isToggled={isToggled} onClick={handleClick} />
        </div>
      </div>
    </aside>
  );
};
