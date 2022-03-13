import '../Avatar/Avatar.scss';
import avatarPhoto from '../../images/studentPhoto.png';

export type AvatarProps={
  data: AvatarData
}

export type AvatarData={
  AvatarPhoto: string
  AvatarName: string
  AvatarRole: string
}


export const  Avatar=(props: AvatarProps)=>{
  return (
    <>
    <div className="wrapper">
      <img src={props.data.AvatarPhoto}></img>
      <div className='avatar-name'>{props.data.AvatarName}</div>
      <div className='avatar-role'>{props.data.AvatarRole}</div>
    </div>
    </>
  )
}