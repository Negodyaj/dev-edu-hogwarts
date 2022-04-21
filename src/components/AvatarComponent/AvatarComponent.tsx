import './AvatarComponent.scss';
import { Icon } from '../../shared/enums/Icon';
import { SvgIcon } from '../SvgIcon/SvgIcon';

export type AvatarComponentProps = {
  photo?: string;
};

export const AvatarComponent = (props: AvatarComponentProps) => {
  return props.photo ? (
    <>
      <div className="avatar-text">
        <img className="avatar-photo" src={props.photo}></img>
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
