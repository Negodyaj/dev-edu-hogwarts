import './Toggle.scss';
import { SvgMoon } from '../../SvgIcon/SvgFiles/SvgMoon';
import { SvgSun } from '../../SvgIcon/SvgFiles/SvgSun';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
import { changeDarkMode } from '../../../actions/mainPanel.actions';

export const Toggle = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const handleClick = () => {
    dispatch(changeDarkMode(!isDark));
  };

  return (
    <div className="toggle" onClick={handleClick}>
      <div className={`toggle-container ${isDark ? 'dark-theme' : ''}`}>
        <SvgMoon />
        <div className="circle" />
        <SvgSun />
      </div>
    </div>
  );
};
