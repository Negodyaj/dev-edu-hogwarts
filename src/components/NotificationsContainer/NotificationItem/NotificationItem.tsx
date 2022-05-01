import "./NotificationItem.scss"

export type NotificationProps = {
  data: NotificationData
  //visible: boolean
}

export type NotificationData = {
  img: any
  text: string
}

export const NotificationItem = (props: NotificationProps) => {
  //const vis = props.visible ? '' : 'invisible';
  //{`notification-window ${vis}`}
  return(
    <div className="notification-window">
      {props.data.img}
      <p className="notification-text">{props.data.text}</p>
    </div>
  )
}