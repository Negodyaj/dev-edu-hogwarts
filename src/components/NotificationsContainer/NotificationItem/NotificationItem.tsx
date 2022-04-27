import "./NotificationItem.scss"

export type NotificationProps = {
  data: NotificationData
}

export type NotificationData = {
  img: string
  text: string
}

/*export const NotificationItem = (props: NotificationProps) => {

  return(
    <div className="notification-window">
      <img src={props.data.img} alt="img" />
      <p>{props.data.text}</p>
    </div>
  )
  
}*/

export const NotificationItem = () => {

  return(
    <div className="notification-window">
      <img src="" alt="img" />
      <p>Я нотификашка</p>
    </div>
  )
  
}