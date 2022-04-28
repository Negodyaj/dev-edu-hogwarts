import './Navigation.scss';
import { ButtonNavigation } from '../ButtonNavigation/ButtonNavigation';
import { useSelector } from 'react-redux';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { AppState } from '../../../store/store';
import { Link } from 'react-router-dom';
import { SelectButtonsByRole } from './NavLinkButtons';
export const Navigation = () => {
  const { currentUser } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );

  return (
    <nav className="main-nav-panel">
      {currentUser ? (
        SelectButtonsByRole(currentUser.roles).map((item) => (
          <ButtonNavigation data={item} key={item?.path}></ButtonNavigation>
        ))
      ) : (
        <>
          <div>
            <Link to={'/register'}>Регистрация</Link>
          </div>
          <Link to={'/login'}>Вход</Link>
        </>
      )}
    </nav>
  );
};
