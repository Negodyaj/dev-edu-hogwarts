import { useDispatch, useSelector } from 'react-redux';
import { setWindowState } from '../../../../actions/modalWindow.actions';
import { baseWretch } from '../../../../services/base-wretch.service';
import { Icon } from '../../../../shared/enums/Icon';
import { ModalWindowState } from '../../../../store/reducers/modalWindow.reducer';
import { AppState } from '../../../../store/store';
import { SvgIcon } from '../../../SvgIcon/SvgIcon';
import { ModalContent } from '../ModalContent';

export const UserEraser = () => {
  const dispatch = useDispatch();
  const { modalType, idUserToDelete: userToDelete } = useSelector(
    (state: AppState) => state.modalWindowState as ModalWindowState
  );

  const postDeleteUser = () => {
    baseWretch().url(`api/Users/${userToDelete}`).delete();
  };

  return (
    // <form className={`modal-window ${modalType}`} onSubmit={handleModalSubmit}>
    <form className={`modal-window ${modalType}`}>
      <div className="icons-container red-colored">
        <SvgIcon icon={Icon.Cross} />
      </div>
      <div className="modal-content">{ModalContent(modalType, userToDelete)}</div>
      <div className="buttons-container">
        <label className="btn btn-white-with-border red-bordered">
          Удалить
          <input className="display-none" type="submit" onClick={postDeleteUser} />
        </label>
        <button
          className="btn btn-text"
          onClick={() => {
            dispatch(setWindowState(false));
          }}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};
