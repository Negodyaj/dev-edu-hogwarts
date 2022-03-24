import "./Avatar.scss";
import { Icon } from "../../../shared/enums/Icon";

export type AvatarProps = {
  data: AvatarData;
};

export type AvatarData = {
  photo?: string;
  name: string;
  role: string;
};

const AvatarPicture=Icon.Picture;

export const Avatar = (props: AvatarProps) => {
  return (
    <>
      
        <div className="avatar-img">
          <img className="photo" src={props.data.photo}></img>
          <div className="svg-fond">
            <{AvatarPicture}/>
                </div>
        </div>
        <div className="wrapper">
        <div className="avatar-name">{props.data.name}</div>
        <div className="avatar-role">{props.data.role}</div>
      </div>
    </>
  );
};
