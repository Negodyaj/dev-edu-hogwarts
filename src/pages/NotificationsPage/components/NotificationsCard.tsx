
import '../components/NotificationsCard.scss';
export type NotificationData = {
  id: number
  sender: string,
  senderPhoto: string,
  senderRole: string,
  messege: string,
  date: string,
  time: string
}
export type NotificationsProps = {
  data: NotificationData,
  currentMessege:number
  onClick: (id:number) => void
}
export const NotificationsCard = (props: NotificationsProps) => {
  return (
    <div className="notification-card">
      <div className={`button-read${props.data.id===props.currentMessege? `-clicked` : ``  }`} onClick={() => props.onClick(props.data.id)}></div>
      <img src={props.data.senderPhoto}></img>
      <div className="notification-card-content">
        <div className="top-flex-container">
          <div>
          <div className="sender-name">{props.data.sender}</div>
          <div className="sender-role">{props.data.senderRole}</div>
          </div>
          <div>
          <span className="date">{props.data.date}</span>
          <span className="time">{props.data.time}</span>
          </div>
        </div>
        <div className="messege">{props.data.messege}</div>
        
      </div>
    </div>

  )
}