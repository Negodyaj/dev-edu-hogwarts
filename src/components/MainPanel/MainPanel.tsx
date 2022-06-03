import './MainPanel.scss';
import { Avatar } from './Avatar/Avatar';
import { Navigation } from './Navigation/Navigation';
import { Exit } from './Exit/Exit';
import { Toggle } from './Toggle/Toggle';
import React from 'react';
import { SvgLogo } from '../SvgIcon/SvgFiles/SvgLogo';
import { SvgLogoName } from '../SvgIcon/SvgFiles/SvgLogoName';
import { CollapseButton } from './CollapseButton/CollapseButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { LoginPageState } from '../../store/reducers/login.reducer';
import defaultAvatar from '../../components/images/defaultavatar.png';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { collapseMainPanel } from '../../actions/mainPanel.actions';
import { StyledMainPanel } from './styled/StyledMainPanel';
const avData = {
  photo: '',
  firstName: '',
  lastName: '',
};

const defaultData = {
  photo: defaultAvatar,
  firstName: '',
  lastName: '',
};
export const MainPanel = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  if (currentUser) {
    avData.firstName = currentUser.firstName;
    avData.lastName = currentUser.lastName;
    avData.photo = currentUser.photo;
  }

  return (
    <StyledMainPanel className={`main-panel transition-styles ${isCollapsed ? 'collapsed' : ''}`}>
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
              !currentUser ? 'margin-top' : ''
            }`}
          >
            <Avatar data={currentUser ? avData : defaultData} />
          </div>
        </div>
        <Navigation />
        <div />
        <div className={`bottom-part transition-styles ${isCollapsed ? 'collapsed' : ''}`}>
          {currentUser ? <Exit /> : ''}
          <Toggle />
        </div>
      </div>
    </StyledMainPanel>
  );
};
