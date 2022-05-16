import { useForm, FormProvider, Controller } from 'react-hook-form';
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

export type UserFormData = {
  id: 1;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  birthDate: string;
  gitHubAccount: string;
  phoneNumber: string;
  city: 1;
  username: string;
};

export const SettingsPage = () => {
  const methods = useForm<UserResponse>({
    defaultValues: {
      birthDate: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
  } = methods;
  const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { isLoading } = useSelector(
    (state: AppState) => state.settingsPageState as SettingsPageState
  );
  const dispatch = useDispatch();
  const onSubmit = (data: UserResponse) => {
    if (currentUser) {
      data.id = currentUser?.id;
      data.username = currentUser.username;
    }
    dispatch(updateUserData(data));
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="settings-container">
          <h2 className="settings-title">Настройки аккаунта</h2>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex-container">
                <div>
                  <div className="form-element">
                    Фамилия
                    <input
                      className="form-input"
                      defaultValue={currentUser?.lastName}
                      type="text"
                      {...methods.register('lastName', {
                        required: true,
                        maxLength: 20,
                        pattern: /^[a-zа-яё]+$/i,
                      })}
                    />
                    {errors?.lastName?.type === 'maxLength' && (
                      <p className="error-message">Превышена допустимая длина 20 символов</p>
                    )}
                    {errors?.lastName?.type === 'pattern' && (
                      <p className="error-message">Введите корректные данные </p>
                    )}
                  </div>
                  <div className="form-element">
                    Имя
                    <input
                      className="form-input"
                      defaultValue={currentUser?.firstName}
                      {...methods.register('firstName', {
                        required: true,
                        maxLength: 20,
                        pattern: /^[a-zа-яё]+$/i,
                      })}
                    />
                    {errors?.firstName?.type === 'maxLength' && (
                      <p className="error-message">Превышена допустимая длина 20 символов</p>
                    )}
                    {errors?.firstName?.type === 'pattern' && (
                      <p className="error-message">Введите корректные данные </p>
                    )}
                  </div>
                  <div className="form-element">
                    Отчество
                    <input
                      className="form-input"
                      defaultValue={currentUser?.patronymic}
                      {...methods.register('patronymic', {
                        required: true,
                        maxLength: 30,
                        pattern: /^[a-zа-яё]+$/i,
                      })}
                    />
                    {errors?.patronymic?.type === 'maxLength' && (
                      <p className="error-message">Превышена допустимая длина 20 символов</p>
                    )}
                    {errors?.patronymic?.type === 'pattern' && (
                      <p className="error-message">Введите корректные данные</p>
                    )}
                  </div>
                  <div className="form-element">
                    Дата рождения
                    <Controller
                      name="birthDate"
                      control={methods.control}
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
                    <Link to={'#'}>
                      <SvgPencil />
                    </Link>
                  </div>
                </div>
                <div className="form-element">
                  Email
                  <input
                    className="form-input"
                    defaultValue={currentUser?.email}
                    {...register('email', {
                      required: true,
                      pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                    })}
                  />
                  {errors?.email?.type === 'required' && (
                    <p className="error-message">Введите данные</p>
                  )}
                  {errors?.email?.type === 'pattern' && (
                    <p className="error-message">Проверьте корректность данных</p>
                  )}
                </div>

                <div className="form-element">
                  Ссылка на GitHub
                  <input
                    className="form-input"
                    defaultValue={currentUser?.gitHubAccount}
                    {...methods.register('gitHubAccount', {
                      required: true,
                      pattern:
                        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
                    })}
                  />
                  {errors?.gitHubAccount?.type === 'pattern' && (
                    <p className="error-message">Проверьте корректность данных</p>
                  )}
                </div>
                <div className="form-element">
                  Телефон
                  <input
                    className="form-input"
                    type="tel"
                    defaultValue={currentUser?.phoneNumber}
                    {...methods.register('phoneNumber', {
                      required: true,
                      pattern: /^[ 0-9]+$/,
                    })}
                  />
                  {errors?.phoneNumber?.type === 'pattern' && (
                    <p className="error-message">Проверьте корректность данных</p>
                  )}
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
          </FormProvider>
        </div>
      )}
    </>
  );
};
