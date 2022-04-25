import { useForm, FormProvider, Controller } from 'react-hook-form';
import '../SettingsPage/SettingsPage.scss';
import '../SettingsPage/SettingsPage.scss';
import { baseWretch } from '../../services/base-wretch.service';
import '../../components/SvgIcon/SvgIcon';
import { Link } from 'react-router-dom';
import { SvgPencil } from '../../components/SvgIcon/SvgFiles/SvgPencil';
import Datepicker from '../../components/Datepicker/Datepicker';
import {
  Button,
  ButtonModel,
  ButtonType,
} from '../../components/Button/Button';
import { AvatarComponent } from '../../components/AvatarComponent/AvatarComponent';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { LoginPageState } from '../../store/reducers/login.reducer';

export type UserFormData = {
  id: 1;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  password: string;
  birthDate: string;
  gitHubAccount: string;
  phoneNumber: string;
  city: 1;
  username: string;
};

export const SettingsPage = () => {
  const methods = useForm<UserFormData>({
    defaultValues: {
      birthDate: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
  } = methods;
  const { currentUser } = useSelector(
    (state: AppState) => state.loginPageState as LoginPageState
  );

  const convertDate = (date: string) => {
    return moment(new Date(date)).format('DD.MM.YYYY').toString();
  };

  const onSubmit = (data: UserFormData) =>
    baseWretch()
      .url('api/Users/' + currentUser?.id)
      .put({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        patronymic: data.patronymic,
        email: data.email,
        password: data.password,
        birthDate: convertDate(data.birthDate),
        gitHubAccount: data.gitHubAccount,
        phoneNumber: data.phoneNumber,
        city: 1,
        username: data.username,
      });

  return (
    <div className="settings-container">
      <div className="settings-container-info">
        <div className="settings">Настройки аккаунта</div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex-container">
              <div>
                <div className="data-block">
                  <p>Фамилия</p>
                  <input
                    className="lstName"
                    defaultValue={currentUser?.lastName}
                    type="text"
                    {...methods.register('lastName', {
                      required: true,
                      maxLength: 20,
                      pattern: /^[a-zа-яё]+$/i,
                    })}
                  />
                  {errors?.lastName?.type === 'maxLength' && (
                    <p className="error-message">
                      Превышена допустимая длина 20 символов
                    </p>
                  )}
                  {errors?.lastName?.type === 'pattern' && (
                    <p className="error-message">Введите корректные данные </p>
                  )}
                </div>
                <div className="data-block">
                  <p>Имя</p>
                  <input
                    defaultValue={currentUser?.firstName}
                    {...methods.register('firstName', {
                      required: true,
                      maxLength: 20,
                      pattern: /^[a-zа-яё]+$/i,
                    })}
                  ></input>
                  {errors?.firstName?.type === 'maxLength' && (
                    <p className="error-message">
                      Превышена допустимая длина 20 символов
                    </p>
                  )}
                  {errors?.firstName?.type === 'pattern' && (
                    <p className="error-message">Введите корректные данные </p>
                  )}
                </div>
                <div className="data-block">
                  <p>Отчество</p>
                  <input
                    defaultValue={currentUser?.patronymic}
                    {...methods.register('patronymic', {
                      required: true,
                      maxLength: 30,
                      pattern: /^[a-zа-яё]+$/i,
                    })}
                  ></input>
                  {errors?.patronymic?.type === 'maxLength' && (
                    <p className="error-message">
                      Превышена допустимая длина 20 символов
                    </p>
                  )}
                  {errors?.patronymic?.type === 'pattern' && (
                    <p className="error-message">Введите корректные данные</p>
                  )}
                </div>
                <div className="data-block">
                  <p>Дата рождения</p>
                  <div className="date-picker-settings max-width-datepicker">
                    <Controller
                      name="birthDate"
                      control={methods.control}
                      rules={{ required: true }}
                      render={({ field }) => <Datepicker field={field} />}
                    />
                  </div>
                </div>
              </div>
              <div className="settings-photo">
                <AvatarComponent photo="http://localhost:3000/static/media/avatar_settings.f04f5af1751b20e8efb2.png"></AvatarComponent>
              </div>
            </div>
            <div className="grid-container">
              <div className="data-block password">
                <p className="margin-top-settings">Пароль</p>
                <div className="goto-change-password">
                  <div>
                    <div className="circle-password"></div>
                    <div className="circle-password"></div>
                    <div className="circle-password"></div>
                    <div className="circle-password"></div>
                    <div className="circle-password"></div>
                    <div className="circle-password"></div>
                    <div className="circle-password"></div>
                    <div className="circle-password"></div>
                  </div>
                  <Link to={'#'}>
                    <SvgPencil></SvgPencil>
                  </Link>
                </div>
              </div>
              <div className="data-block ">
                <p>Email</p>
                <input
                  defaultValue={currentUser?.email}
                  {...register('email', {
                    required: true,
                    pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                  })}
                ></input>
                {errors?.email?.type === 'required' && (
                  <p className="error-message">Введите данные</p>
                )}
                {errors?.email?.type === 'pattern' && (
                  <p className="error-message">Проверьте корректность данных</p>
                )}
              </div>

              <div className="data-block git-hub">
                <p>Ссылка на GitHub</p>
                <input
                  defaultValue={currentUser?.gitHubAccount}
                  {...methods.register('gitHubAccount', {
                    required: true,
                    pattern:
                      /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
                  })}
                ></input>
                {errors?.gitHubAccount?.type === 'pattern' && (
                  <p className="error-message">Проверьте корректность данных</p>
                )}
              </div>
              <div className="data-block phone">
                <p>Телефон</p>
                <input
                  type="tel"
                  defaultValue={currentUser?.phoneNumber}
                  {...methods.register('phoneNumber', {
                    required: true,
                    pattern: /^[ 0-9]+$/,
                  })}
                ></input>
                {errors?.phoneNumber?.type === 'pattern' && (
                  <p className="error-message">Проверьте корректность данных</p>
                )}
              </div>
            </div>
            <div className="styles-for-settings-buttons">
              <Button
                text={'Сохранить'}
                type={ButtonType.submit}
                model={ButtonModel.Colored}
              ></Button>
              <Button
                text={'Отмена'}
                type={ButtonType.reset}
                model={ButtonModel.Text}
              ></Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
