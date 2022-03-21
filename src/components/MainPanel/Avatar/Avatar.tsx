import "./Avatar.scss";

export type AvatarProps = {
  data: AvatarData;
};

export type AvatarData = {
  photo?: string;
  name: string;
  role: string;
};

export const Avatar = (props: AvatarProps) => {
  return (
    <>
      
        <div className="avatar-img">
          <img className="photo" src={props.data.photo}></img>
          <div className="svg-fond">
            <svg
              width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.25 35.4168L17.1458 22.7051C17.9849 21.7261 19.5027 21.7367 20.328 22.7272L27.7062 31.5809C28.4905 32.5221 29.9135 32.5866 30.7798 31.7204L33.7708 28.7294C34.6488 27.8514 36.095 27.9315 36.8707 28.9011L43.75 37.5002"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M41.6667 6.25H8.33333C7.18274 6.25 6.25 7.18274 6.25 8.33333V41.6667C6.25 42.8173 7.18274 43.75 8.33333 43.75H41.6667C42.8173 43.75 43.75 42.8173 43.75 41.6667V8.33333C43.75 7.18274 42.8173 6.25 41.6667 6.25Z"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M29.166 16.6663C29.166 15.5157 30.0988 14.583 31.2494 14.583C32.3999 14.583 33.3327 15.5157 33.3327 16.6663C33.3327 17.8169 32.3999 18.7497 31.2494 18.7497C30.0988 18.7497 29.166 17.8169 29.166 16.6663Z"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />   
                </svg>
                </div>
        </div>
        <div className="wrapper">
        <div className="avatar-name">{props.data.name}</div>
        <div className="avatar-role">{props.data.role}</div>
      </div>
    </>
  );
};
