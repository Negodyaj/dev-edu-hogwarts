import './Navigation.scss';
import { ButtonNavigation } from '../ButtonNavigation/ButtonNavigation';
import { useSelector } from 'react-redux';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { AppState } from '../../../store/store';
import { Link, useLocation } from 'react-router-dom';
import { getNavLinksByRole } from './navLinksProvider';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';

export const Navigation = () => {
  const { currentUser, currentRole } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  const location = useLocation();

  return (
    <nav className="main-nav-panel">
      {currentUser || isCollapsed ? (
        getNavLinksByRole(currentRole).map((item) => (
          <ButtonNavigation isCollapsed={isCollapsed} data={item} key={item?.path} />
        ))
      ) : (
        <div className="flex-container">
          <Link
            className={`auth-link${location.pathname === '/login' ? ' active-auth-link' : ''}`}
            to={'/login'}
          >
            Вход
          </Link>
          <Link
            className={`auth-link${location.pathname === '/register' ? ' active-auth-link' : ''}`}
            to={'/register'}
          >
            Регистрация
          </Link>
        </div>
      )}
    </nav>
  );
};
