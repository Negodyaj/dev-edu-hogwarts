import { useNavigate } from 'react-router-dom';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';

interface BackButtonProps {
  path?: string;
}

export const BackButton = ({ path }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    // чет мне это не оч нравится)
    <div
      className="link-arrow"
      onClick={() => (typeof path === 'string' ? navigate(path) : navigate(-1))}
    >
      <SvgArrow direction="left" />
      Назад
    </div>
  );
};
