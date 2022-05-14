import './AvatarUploader.scss';
import { Icon } from '../../shared/enums/Icon';
import { SvgIcon } from '../SvgIcon/SvgIcon';

export type AvatarUploaderProps = {
  photo?: string;
};

export const AvatarUploader = (props: AvatarUploaderProps) => {
  return props.photo ? (
    <>
      <div className="avatar-text">
        <img className="avatar-photo" src={`./static${props.photo}`} />
        <div className="svg-text">
          <SvgIcon icon={Icon.Picture} />
          <a href="#">Загрузить новое фото</a>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="avatar-text">
        <div className="svg-text">
          <SvgIcon icon={Icon.Picture} />
          <a href="#">Загрузить новое фото</a>
        </div>
      </div>
    </>
  );
};
