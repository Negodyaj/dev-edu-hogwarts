import { useNavigate } from 'react-router-dom';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';

interface BackButtonProps {
  path?: string;
  callback?: () => void;
}

export const BackButton = ({ path, callback }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="link-arrow"
      onClick={() => {
        if (path) {
          navigate(path);
        } else {
          navigate(-1);
        }
        callback?.();
      }}
    >
      <SvgArrow direction="left" />
      Назад
    </div>
  );
};
