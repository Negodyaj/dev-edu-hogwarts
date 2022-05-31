import './AvatarUploader.scss';
import { Icon } from '../../shared/enums/Icon';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import { useDispatch } from 'react-redux';
import { setWindowState, setWindowType } from '../../actions/modalWindow.actions';
import { ModalType } from '../../shared/enums/modalType';

export type AvatarUploaderProps = {
  photo?: string;
};

export const AvatarUploader = (props: AvatarUploaderProps) => {
  const dispatch = useDispatch();

  return props.photo ? (
    <>
      <div
        className="avatar-text"
        onClick={() => {
          dispatch(setWindowType(ModalType.loadModalPhoto));
          dispatch(setWindowState(true));
        }}
      >
        <img className="avatar-photo" src={`./static${props.photo}`} />
        <div className="svg-text">
          <SvgIcon icon={Icon.Picture} />
          <a href="#">Загрузить новое фото</a>
        </div>
      </div>
    </>
  ) : (
    <>
      <div
        className="avatar-text"
        onClick={() => {
          dispatch(setWindowType(ModalType.loadModalPhoto));
          dispatch(setWindowState(true));
        }}
      >
        <div className="svg-text">
          <SvgIcon icon={Icon.Picture} />
          <a href="#">Загрузить новое фото</a>
        </div>
      </div>
    </>
  );
};
