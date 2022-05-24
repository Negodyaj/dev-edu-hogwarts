import { ModalType } from '../../../shared/enums/modalType';

export const ModalContent = (type: ModalType, userToDelete?: number) => {
  switch (type) {
    case ModalType.loadModalPhoto:
      return 'Загрузите свою настоящую фотографию. Вы можете загрузить изображение в формате JPG или PNG';
    case ModalType.sendPhoto:
      return 'Выбранная область будет показываться в вашем профиле';
    case ModalType.deleteUser:
      return `Вы уверены, что хотите удалить пользователя ${userToDelete}?`;
    case ModalType.deleteHomework:
      return `Вы уверены, что хотите удалить задание?`;
  }
};
