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
import { Input } from '../../components/styled/Input';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';

export const SettingsPage = () => {
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
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
                  <Input
                    register={register}
                    name={'lastName'}
                    defaultValue={currentUser?.lastName}
                    type={'text'}
                  ></Input>
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="form-element">
                  Имя
                  <Input
                    register={register}
                    name={'firstName'}
                    defaultValue={currentUser?.firstName}
                    type={'text'}
                  ></Input>
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-element">
                  Отчество
                  <Input
                    register={register}
                    name={'patronymic'}
                    defaultValue={currentUser?.patronymic}
                    type={'text'}
                  ></Input>
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
                <div className={`fake-password-input ${isDark ? 'dark-theme-background' : ''}`}>
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
                <Input
                  readonly={true}
                  customClassName="readonly-input"
                  register={register}
                  name={'email'}
                  defaultValue={currentUser?.email}
                  type={'text'}
                ></Input>
                {/* <input
                  className="form-input readonly-input"
                  defaultValue={currentUser?.email}
                  {...register('email')}
                  readOnly={true}
                /> */}
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-element">
                Ссылка на GitHub
                <Input
                  register={register}
                  name={'gitHubAccount'}
                  defaultValue={currentUser?.gitHubAccount}
                  type={'text'}
                ></Input>
                <div className="invalid-feedback">{errors.gitHubAccount?.message}</div>
              </div>
              <div className="form-element">
                Телефон
                <Input
                  register={register}
                  name={'phoneNumber'}
                  defaultValue={currentUser?.phoneNumber}
                  type={'tel'}
                ></Input>
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
