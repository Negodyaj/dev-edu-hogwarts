import avatarPhoto from '../../components/images/avatar.png';
import { AvatarComponent } from '../../components/AvatarComponent/AvatarComponent';
import { NewGroupePage } from '../NewGroupePage/NewGroupePage';


export const SettingsPage = () => {
  return (
    <div>Настройки
      {/* <AvatarComponent photo={avatarPhoto}/> */}
      {/* <AvatarComponent /> */}
      <NewGroupePage/>
    </div>
  )
}