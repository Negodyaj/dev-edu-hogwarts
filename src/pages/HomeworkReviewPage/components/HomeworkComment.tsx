import "./HomeworkComment.scss"

export type HomeworkCommentProps = {
    data: HwCommentData
}

export type HwCommentData = {
  id: number
  isCurrentUser: boolean
  firstName: string
  lastName: string
  role: string
  date: string
  avatarUrl?: string
  commentText: string
}

export const HomeworkComment = (props: HomeworkCommentProps) => {

    return(
      <div className={`${props.data.isCurrentUser ? "current-users-comment" : "other-users-comment"} comment-container`}>
        <img className="comment-avatar" src={props.data.avatarUrl} />
        <div className="comment">
          <div className="first-row">
            <div className="user-name">{props.data.firstName} {props.data.lastName}</div>
            <div className="comment-date">{props.data.date}</div>
          </div>
          <div>{props.data.role}</div>
          <p className="comment-text">{props.data.commentText}</p>
        </div>
      </div>
      
    )

}