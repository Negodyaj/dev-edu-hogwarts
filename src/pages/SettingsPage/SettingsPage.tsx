import { useForm, Controller } from 'react-hook-form';
import '../SettingsPage/SettingsPage.scss';
import '../SettingsPage/SettingsPage.scss';
import '../../components/SvgIcon/SvgIcon';
import { Link } from 'react-router-dom';
import { SvgPencil } from '../../components/SvgIcon/SvgFiles/SvgPencil';
import Datepicker from '../../components/Datepicker/Datepicker';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import { AvatarUploader } from '../../components/AvatarUploader/AvatarUploader';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { updateUserData } from '../../actions/settings.thunk';
import { UserResponse } from '../../models/responses/UserResponse';
import { SettingsPageState } from '../../store/reducers/settings.reducer';
import { Loader } from '../HomeworksPage/HomeworkPage/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const SettingsPage = () => {
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const dispatch = useDispatch();
  const onSubmit = (data: UserResponse) => {
    if (currentUser) {
      dispatch(updateUserData(data));
    }
  };
  const validationSchema = () =>
    Yup.object().shape({
      firstName: Yup.string()
        .default(currentUser?.firstName)
        .matches(/^[a-zа-яё]+$/i, 'Введите корректные данные')
        .max(20, 'Превышена допустимая длина 20 символов'),
      lastName: Yup.string()
        .default(currentUser?.lastName)
        .matches(/^[a-zа-яё]+$/i, 'Введите корректные данные')
        .max(30, 'Превышена допустимая длина 30 символов'),
      patronymic: Yup.string()
        .default(currentUser?.patronymic)
        .matches(/^[a-zа-яё]+$/i, 'Введите корректные данные')
        .max(30, 'Превышена допустимая длина 30 символов'),
      email: Yup.string()
        .default(currentUser?.email)
        .matches(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, 'Введите корректные данные'),
      gitHubAccount: Yup.string()
        .matches(
          /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
          'Введите корректные данные'
        )
        .default(currentUser?.gitHubAccount),
      phoneNumber: Yup.string()
        .matches(/^[ 0-9]+$/, 'Введите корректные данные')
        .default(currentUser?.phoneNumber),
      id: Yup.number().default(currentUser?.id),
      username: Yup.string().default(currentUser?.username),
      city: Yup.number().default(1),
    });
  const formOptions = { resolver: yupResolver(validationSchema()) };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserResponse>(formOptions);

  const { isLoading } = useSelector(
    (state: AppState) => state.settingsPageState as SettingsPageState
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="settings-container">
          <h2 className="settings-title">Настройки аккаунта</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-container">
              <div className="settings-content">
                <div className="form-element last-name-form-element">
                  Фамилия
                  <input
                    className="form-input"
                    defaultValue={currentUser?.lastName}
                    type="text"
                    {...register('lastName', {})}
                  />
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="form-element">
                  Имя
                  <input
                    className="form-input"
                    defaultValue={currentUser?.firstName}
                    {...register('firstName')}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-element">
                  Отчество
                  <input
                    className="form-input"
                    defaultValue={currentUser?.patronymic}
                    {...register('patronymic')}
                  />
                  <div className="invalid-feedback">{errors.patronymic?.message}</div>
                </div>
                <div className="form-element">
                  Дата рождения
                  <Controller
                    name="birthDate"
                    defaultValue={currentUser?.birthDate}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Datepicker field={field} />}
                  />
                </div>
              </div>
              <div className="settings-photo">
                <AvatarUploader photo={currentUser?.photo} />
              </div>
            </div>
            <div className="form-grid-container">
              <div className="form-element password">
                Пароль
                <div className="form-input">
                  <div>
                    <div className="circle-password" />
                    <div className="circle-password" />
                    <div className="circle-password" />
                    <div className="circle-password" />
                    <div className="circle-password" />
                    <div className="circle-password" />
                    <div className="circle-password" />
                    <div className="circle-password" />
                  </div>
                  <Link to={'/change-password'}>
                    <SvgPencil />
                  </Link>
                </div>
              </div>
              <div className="form-element">
                Email
                <input
                  className="form-input"
                  defaultValue={currentUser?.email}
                  {...register('email')}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-element">
                Ссылка на GitHub
                <input
                  className="form-input"
                  defaultValue={currentUser?.gitHubAccount}
                  {...register('gitHubAccount')}
                />
                <div className="invalid-feedback">{errors.gitHubAccount?.message}</div>
              </div>
              <div className="form-element">
                Телефон
                <input
                  className="form-input"
                  type="tel"
                  defaultValue={currentUser?.phoneNumber}
                  {...register('phoneNumber')}
                />
                <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
              </div>
            </div>
            <div className="buttons-group">
              <Button
                text={'Сохранить'}
                type={ButtonType.submit}
                model={ButtonModel.Colored}
                width="190"
              />
              <Button text={'Отмена'} type={ButtonType.reset} model={ButtonModel.Text} />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
