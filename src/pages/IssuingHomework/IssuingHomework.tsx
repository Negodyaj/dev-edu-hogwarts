import {useForm} from "react-hook-form";
import {FilterList} from "../../components/FilterList";
import {Link} from "react-router-dom";

export type AddTaskFormData = {
  name: string
  description: string
  // links: ''
  // isRequired: true
  // tags: [0]
  homework: {
    startDate: string
    endDate: string
  }
  groupId: number
}

export const IssuingHomework = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddTaskFormData>();
  
  // Мне с бека пока нечего тащить, группы не достать,
  //  номера заданий из групп не достать ибо в существующих сча в бд тоже нет заданий)
  // useEffect(() => {}, [])

  // Ну тут пока тоже интересная история
  const onSubmit = () => {}
  // const onSubmit = (data: AddTaskFormData) => baseWretch()
  //   .url(addNewTaskUrl)
  //   .post(data)
  //   .res(res => res.json());

  // Нет эндпоинта
  const saveDraft = () => {};

  return(
    <form>
      <span>Новое задание</span>
      <Link to='drafts'>Список сохраненных занятий</Link>
      <div>
        Номер группы:
        <label>
          <input type="radio" {...register("groupId", { required: true })}/>group 1
        </label>
        <label>
          <input type="radio" {...register("groupId", { required: true })}/>group 2
        </label>
        <label>
          <input type="radio" {...register("groupId", { required: true })}/>group 3
        </label>
      </div>
      <div>
        Номер задания:
        {/* Не ясно как это передавать, точнее в теле метода нет такого поля) */}
        <FilterList data={[{id: 1, name: 'First Task'},{id:2, name: 'SecondTask'}]} type=''/>
      </div>
      <div>
        <div>
          <input type="date" {...register("homework.startDate", { required: true })}/>
        </div>
        <div>
          <input type="date" {...register("homework.endDate", { required: true })}/>
        </div>
      </div>
      <div>
        Название задания
        <input type="text" {...register("name", { required: true })}/>
      </div>
      <div>
        Описание задания
        <input type="textarea" {...register("description", { required: true })}/>
      </div>
      <div>
        <button type="submit" onSubmit={() => onSubmit}>Опубликовать</button>
        <button type="button" onClick={() => saveDraft}>Сохранить как черновик</button>
        {/* Линка обратно */}
        <button type="reset">Отмена</button>
      </div>
    </form>
  )
}