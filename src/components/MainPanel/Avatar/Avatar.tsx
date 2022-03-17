import './Avatar.scss';

export type AvatarProps={
  data: AvatarData
}

export type AvatarData={
  photo: string
  name: string
  role: string
}


export const  Avatar=(props: AvatarProps)=>{
  return (
    <>
    <div className="wrapper">
      <img src={props.data.photo}></img>
      <div className='avatar-name'>{props.data.name}</div>
      <div className='avatar-role'>{props.data.role}</div>
    </div>
    </>
  )
}