import './ModalWindow.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { ModalWindowState } from '../../store/reducers/modalWindow.reducer';
import { ModalType } from '../../shared/enums/modalType';
import { UserEraser } from './components/UserEraser/UserEraser';
import { AvatarCropper } from './components/AvatarCropper/AvatarCropper';

export const ModalWindow = () => {
  const { modalType } = useSelector(
    (state: AppState) => state.modalWindowState as ModalWindowState
  );

  return (
    <div className="modal-background">
      {modalType === ModalType.deleteUser ? <UserEraser /> : <AvatarCropper />}
    </div>
  );
};
