import {HomeworkCard} from "../HomeworksPage/components/HomeworkCard";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/store";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {wretchHomework} from "../../actions/homework.actions";
import {Loader} from "./Loader";

export const HomeworkPage = () => {
  const dispatch = useDispatch();
  let {id} = useParams();
  let {homework, loading} = useSelector((state: AppState) => state.homeworkPageState)

  useEffect(() => {
    dispatch(wretchHomework(Number(id)))
  }, [])

  console.log(loading)

  if(loading) return <Loader/>

  return (
    <div style={{margin: '70px 20px'}}>
      <HomeworkCard data={homework} oneCard={true}/>
    </div>
  )
}