import '../Exit/Exit.scss';
import '../../SvgIcon/SvgFiles/SvgExit';
import { SvgExit } from '../../SvgIcon/SvgFiles/SvgExit';

export const Exit = () => {
  return (
    <a className="exit flex-center" href="#">
      <SvgExit />
      <span className="exit-text transition-styles">Выйти</span>
    </a>
  );
};
