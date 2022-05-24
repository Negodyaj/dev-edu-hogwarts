import { useDispatch, useSelector } from 'react-redux';
import { setWindowState } from '../../../../actions/modalWindow.actions';
import { Icon } from '../../../../shared/enums/Icon';
import { SvgIcon } from '../../../SvgIcon/SvgIcon';
import { ModalContent } from '../ModalContent';
import { Button, ButtonModel } from '../../../Button/Button';
import { AppState } from '../../../../store/store';
import { ModalWindowState } from '../../../../store/reducers/modalWindow.reducer';
import { deleteHomework, deleteTask } from '../../../../actions/homeworks.thunks';

export const ModalDeleteHomework = () => {
  const dispatch = useDispatch();
  const { modalType, homeworkToDelete, taskToDelete, inProcess, errorMessage } = useSelector(
    (state: AppState) => state.modalWindowState as ModalWindowState
  );

  return (
    <div className="modal-window">
      <div className="icons-container red-colored">
        <SvgIcon icon={Icon.Cross} />
      </div>
      <div className="modal-content">
        {!errorMessage ? ModalContent(modalType) : 'Ой, что-то пошло не так, попробуйте позже!'}
      </div>
      <div className="buttons-group">
        {!errorMessage && (
          <Button
            model={ButtonModel.Colored}
            disabled={inProcess}
            onClick={() => {
              if (homeworkToDelete) {
                dispatch(deleteHomework(homeworkToDelete.id));
              }
              if (taskToDelete) {
                dispatch(deleteTask(taskToDelete.id));
              }
            }}
            text="Удалить"
          />
        )}
        <Button
          model={ButtonModel.Text}
          disabled={inProcess}
          onClick={() => dispatch(setWindowState(false))}
          text="Отмена"
        />
      </div>
    </div>
  );
};
