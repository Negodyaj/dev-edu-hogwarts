import { useCallback, useState } from 'react';
import Cropper, { Point } from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowState, setWindowType } from '../../../../actions/modalWindow.actions';
import { Icon } from '../../../../shared/enums/Icon';
import { ModalType } from '../../../../shared/enums/modalType';
import { ModalWindowState } from '../../../../store/reducers/modalWindow.reducer';
import { AppState } from '../../../../store/store';
import { SvgIcon } from '../../../SvgIcon/SvgIcon';
import { ModalContent } from '../ModalContent';
import './AvatarCropper.scss';
import getCroppedImg, { dataURLtoFile } from './CropImage';
import { baseWretch } from '../../../../services/base-wretch.service';

function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export const AvatarCropper = () => {
  const dispatch = useDispatch();
  const { modalType } = useSelector(
    (state: AppState) => state.modalWindowState as ModalWindowState
  );
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPxls) => {
    setCroppedAreaPixels(croppedAreaPxls);
  }, []);

  const onFileChanged = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      dispatch(setWindowType(ModalType.sendPhoto));
    }
  };

  const uploadPhoto = async () => {
    const canvas = await getCroppedImg(imageSrc, croppedAreaPixels);
    const canvasDataURL = canvas.toDataURL('image/jpeg');
    const newAvatar = dataURLtoFile(canvasDataURL, 'avatar.jpeg');

    const fd = new FormData();
    fd.append('photo', newAvatar);

    baseWretch()
      .url('api/Users/photo')
      .formData({
        photo: newAvatar,
      })
      .post();

    dispatch(setWindowState(false));
  };

  return (
    <div className={`modal-window ${ModalType}`}>
      {modalType === ModalType.loadModalPhoto ? (
        <div className="icons-container">
          <SvgIcon icon={Icon.Pic} />
        </div>
      ) : (
        <div className="crop-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
            showGrid={false}
          />
        </div>
      )}
      <div className="modal-content">{ModalContent(modalType)}</div>
      <div className="buttons-container">
        {modalType === ModalType.loadModalPhoto ? (
          <label className="btn btn-fill">
            ?????????????? ????????
            <input
              className="display-none"
              type="file"
              accept="image/jpeg,image/png"
              onChange={onFileChanged}
            />
          </label>
        ) : (
          <label className="btn btn-fill">
            ??????????????????
            <input className="display-none" type="submit" onClick={uploadPhoto} />
          </label>
        )}
        <button
          className="btn btn-text"
          onClick={() => {
            dispatch(setWindowState(false));
          }}
        >
          ????????????
        </button>
      </div>
    </div>
  );
};
