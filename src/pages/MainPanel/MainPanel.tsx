import  '../MainPanel/MainPanel.scss';
import devEduLogo from '../../pages/images/devEduLogo.svg';
import devEduTitle from '../../pages/images/devEduTitle.svg';
import { Avatar} from './Avatar/Avatar';
import { Nagigation } from './Navigation/Navigation';
import avatarPhoto from '../../pages/images/studentPhoto.png'
import {Toggle} from './Toggle/Toggle';
let avData =   {
    AvatarPhoto: avatarPhoto,
    AvatarName: 'Антон Ефременков',
    AvatarRole: 'студент'
  };

export const MainPanel = ()=>{
  return (
    <div className="panel">
      <div className="panel-container">
        <div className='content-container'>
      <img src={devEduLogo} className="logo" alt="logo" />
      <img src={devEduTitle} alt="DevEducation" />
      <div className='avatar-block'>
            <Avatar data={avData}/>
      </div>
      </div>
      </div>
      <Nagigation></Nagigation>
      <Toggle></Toggle>
    </div>
  )
}