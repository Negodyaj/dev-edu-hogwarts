import { ModalContent } from '../ModalContent';
import { Button, ButtonModel } from '../../../Button/Button';
import { homeworksLink } from '../../../MainPanel/Navigation/constants';
import { setWindowState } from '../../../../actions/modalWindow.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../../../store/store';
import { ModalWindowState } from '../../../../store/reducers/modalWindow.reducer';
import { SvgArrow } from '../../../SvgIcon/SvgFiles/SvgArrow';
import { SvgCross } from '../../../SvgIcon/SvgFiles/SvgCross';

export const ModalDeleteResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let navigateLink = homeworksLink;
  const { modalType, taskToDelete, errorMessage } = useSelector(
    (state: AppState) => state.modalWindowState as ModalWindowState
  );

  return (
    <div className="modal-window">
      <div className={`icons-container ${!errorMessage ? 'green-colored' : 'red-colored'}`}>
        {errorMessage ? <SvgCross /> : <SvgArrow direction="bottom" />}
      </div>
      <div className="modal-content">{ModalContent(modalType)}</div>
      <div className="buttons-group">
        <Button
          model={ButtonModel.Colored}
          onClick={() => {
            if (!errorMessage) {
              navigateLink = taskToDelete ? `${homeworksLink}/drafts` : navigateLink;
              navigate(navigateLink);
            }
            dispatch(setWindowState(false));
          }}
          text="Ок"
        />
      </div>
    </div>
  );
};
