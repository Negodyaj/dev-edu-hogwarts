import {useForm} from "react-hook-form";
import {FilterList} from "../../components/FilterList";
import {Link} from "react-router-dom";
import './IssuingHomework.scss'
import {useRef} from "react";

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
  task:number
  groupId: number
}

export const IssuingHomework = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddTaskFormData>();
  const ref = useRef<HTMLInputElement | null>(null)
  const refForm = useRef(null)
  // Мне с бека пока нечего тащить, группы не достать,
  //  номера заданий из групп не достать ибо в существующих сча в бд тоже нет заданий)
  // useEffect(() => {}, [])

  // Ну тут пока тоже интересная история
  const onSubmit = () => {
    console.log(refForm)
  }
  // const onSubmit = (data: AddTaskFormData) => baseWretch()
  //   .url(addNewTaskUrl)
  //   .post(data)

  // Нет эндпоинта
  const saveDraft = () => {};

  return(
    <form className='form-container' ref={refForm}>
      <span>Новое задание</span>
      <div className='homework-form_area'>
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
      <div className='homework-form_area'>
        Номер задания:
        {/* Не ясно как это передавать, точнее в теле метода нет такого поля) */}
        <FilterList data={[{id: 1, name: 'Все'},{id:2, name: 'Second Task'}]} refData={ref} type=''/>
        <input className='secret-input' type="text" value={ref.current?.dataset.lessonId}  {...register("task", { required: true })}/>
      </div>
      <div className='homework-form_dates'>
        <div>
          Дата выдачи задания
          <input type="date" {...register("homework.startDate", { required: true })}/>
        </div>
        <div>
          Срок сдечи задания
          <input type="date" {...register("homework.endDate", { required: true })}/>
        </div>
      </div>
      <div className='homework-form_area'>
        Название задания
        <input type="text" {...register("name", { required: true })}/>
      </div>
      <div className='homework-form_area'>
        Описание задания
        <textarea placeholder={'Введите текст'} {...register("description", { required: true })}/>
      </div>
      <div>
        <button type="submit" onClick={(e) => {
          e.preventDefault()
          onSubmit()
        }}>Опубликовать</button>
        <button type="button" onClick={() => saveDraft}>Сохранить как черновик</button>
        {/* Линка обратно */}
        <button type="reset">Отмена</button>
      </div>
    </form>
  )
}