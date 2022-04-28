import "./NotificationItem.scss"

export type NotificationProps = {
  data: NotificationData
}

export type NotificationData = {
  img: any
  text: string
  visible: boolean
}

export const NotificationItem = (props: NotificationProps) => {
  const vis = props.data.visible ? '' : 'invisible';
  
  return(
    <div className={`notification-window ${vis}`}>
      {props.data.img}
      <p className="notification-text">{props.data.text}</p>
    </div>
  )
}