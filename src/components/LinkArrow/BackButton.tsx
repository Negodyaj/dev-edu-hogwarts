import { useNavigate } from 'react-router-dom';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';

interface BackButtonProps {
  path?: string;
}

export const BackButton = ({ path }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <div className="link-arrow" onClick={() => (path ? navigate(path) : navigate(-1))}>
      <SvgArrow direction="left" />
      Назад
    </div>
  );
};
