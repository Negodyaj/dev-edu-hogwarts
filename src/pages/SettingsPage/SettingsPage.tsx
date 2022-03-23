import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { NULL } from 'sass';
export type UserFormData = {

  firstName: string,
  lastName: string,
  patronymic: string,
  email: string,
  password: string,
  city: string,
  birthDate: string,
  gitHubAccount: string,
  phoneNumber: string,
  

}
export const SettingsPage = () => {
  const {register, control} = useForm<UserFormData>();
  return (
    <>
      <div>Настройки аккаунта</div>
      <form>
        <p>Фамилия</p>
        <input {...register('lastName')}></input>
        <p>Имя</p>
        <input></input>
        <p>Отчество</p>
        <input></input>
        <p>Дата рождения</p>
      
        <p>Пароль</p>
      </form>
    </>
  )
}