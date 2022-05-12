import './Navigation.scss';
import { ButtonNavigation } from '../ButtonNavigation/ButtonNavigation';
import { useSelector } from 'react-redux';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { AppState } from '../../../store/store';
import { Link } from 'react-router-dom';
import { getNavLinksByRole } from './navLinksProvider';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
export type NavigationProps = {
  isCollapsed: boolean;
};
export const Navigation = (props: NavigationProps) => {
  const { currentUser, currentRole } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );
  const { isCollapsed } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  return (
    <nav className="main-nav-panel">
      {currentUser || isCollapsed ? (
        getNavLinksByRole(currentRole).map((item) => (
          <ButtonNavigation isCollapsed={props.isCollapsed} data={item} key={item?.path} />
        ))
      ) : (
        <>
          <Link className="login-link" to={'/login'}>
            Вход
          </Link>
          <div>
            <Link className="register-link" to={'/register'}>
              Регистрация
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};
