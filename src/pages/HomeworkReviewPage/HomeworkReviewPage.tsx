import "./HomeworkReviewPage.scss"
import {HomeworkComment} from "./components/HomeworkComment";
import ava from "../../../src/components/images/avatar.png";

let comments = [
  {
    id: 1,
    isCurrentUser: true,
    firstName: "Иван",
    lastName: "Иванов",
    role: "студент",
    date: "12.04.2022 12:00",
    avatarUrl: ava,
    commentText: "Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании существенных финансовых и административных условий"
  },
  { id: 2,
    isCurrentUser: false,
    firstName: "Антон",
    lastName: "Ефременков",
    role: "преподаватель",
    date: "12.04.2022 12:00",
    avatarUrl: ava,
    commentText: "Идейные Равным образом консультация с широким активом требуют определения и уточнения модели развития. Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании существенных финансовых и административных условий."
  },
  { id: 3,
    isCurrentUser: true,
    firstName: "Иван",
    lastName: "Иванов",
    role: "студент",
    date: "12.04.2022 12:00",
    avatarUrl: ava,
    commentText: "Идейные Равным образом консультация с широким активом требуют определения и уточнения модели развития. Идейные соображения высшего порядка, а также укрепление и развитие структуры играет важную роль в формировании существенных финансовых и административных условий."
  }
];

export const HomeworkReviewPage = () => {
  return(
    <div className="comments-container">
      <p className="comment-title">Комментарии к заданию</p>
      {
        comments.map(item => 
        <HomeworkComment data={item} key={item.id} /> )
      }
    </div>
  )
}