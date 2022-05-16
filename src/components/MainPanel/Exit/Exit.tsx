import '../Exit/Exit.scss';
import '../../SvgIcon/SvgFiles/SvgExit';
import { SvgExit } from '../../SvgIcon/SvgFiles/SvgExit';
import { removeToken } from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../actions/login.actions';

export const Exit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    navigate('/login');
    dispatch(setCurrentUser(undefined));
    removeToken();
  };

  return (
    <button onClick={onClick} className="exit flex-center">
      <SvgExit />
      <span className="exit-text transition-styles">Выйти</span>
    </button>
  );
};
