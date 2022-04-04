import avatarPhoto from '../../components/images/avatar.png';
import { AvatarComponent } from '../../components/AvatarComponent/AvatarComponent';


export const SettingsPage = () => {
  return (
    <div>Настройки
      <AvatarComponent photo={avatarPhoto}/>
      {/* <AvatarComponent /> */}
    </div>
  )
}