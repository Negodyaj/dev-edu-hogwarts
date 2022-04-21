import { useNavigate } from 'react-router-dom';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="link-arrow" onClick={() => navigate(-1)}>
      <SvgArrow direction="left" />
      Назад
    </div>
  );
};
