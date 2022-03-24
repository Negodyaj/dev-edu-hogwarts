import {useForm} from "react-hook-form";
import './IssuingHomework.scss'
import {useEffect, useRef, useState} from "react";
import {RadioGroup} from "../../components/RadioGroup/RadioGroup";
import {FilterList} from "../../components/FilterList/FilterList";
import {Datepicker} from "../../components/Datepicker/Datepicker";

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

const groups = [
  {
    id: 1,
    text: 'gr 1',
  },
  {
    id: 2,
    text: 'gr 2',
  },
  {
    id: 3,
    text: 'gr 3',
  }
]

export const IssuingHomework = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddTaskFormData>();
  const ref = useRef<HTMLInputElement | null>(null);
  const [secretValue, setSecretValue] = useState('');

  // Тестовая ссылка
  const refForm = useRef(null);

  // Мне с бека пока нечего тащить, группы не достать,
  //  номера заданий из групп не достать ибо в существующих сча в бд тоже нет заданий)
  useEffect(() => {
    setSecretValue(ref.current?.dataset.lessonId || '')
  }, [])

  const ChangeSecretValue = (value: string) => {
    setSecretValue(value);
  }

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
    <form className='form-container homework-form' ref={refForm}>
      <span>Новое задание</span>

      <div className='homework-form_area'>
        Номер группы:
        <RadioGroup radioData={groups}/>
      </div>

      <div className='homework-form_area'>
        Номер задания:
        {/* Не ясно как это передавать, точнее в теле метода нет такого поля) */}
        <FilterList data={[{id: 1, name: 'Все'},{id:2, name: 'Second Task'}]} refData={ref} type='' callback={ChangeSecretValue}/>
        <input className='secret-input' type="text" value={secretValue}  {...register("task", { required: true })}/>
      </div>

      <div className='homework-form_dates'>
        <div>
          Дата выдачи задания
          <Datepicker {...register("homework.startDate", { required: true })}/>
        </div>
        <div>
          Срок сдечи задания
          <Datepicker {...register("homework.startDate", { required: true })}/>
        </div>
      </div>

      <div className='homework-form_area'>
        Название задания
        <input className='form-input' type="text" placeholder='Введите название' {...register("name", { required: true })}/>
      </div>

      <div className='homework-form_area'>
        Описание задания
        <textarea className='form-input' placeholder='Введите текст' {...register("description", { required: true })}/>
      </div>

      <div>
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}>Опубликовать</button>
        <button type="button" onClick={() => saveDraft}>Сохранить как черновик</button>
        {/* Линка обратно */}
        <button type="reset">Отмена</button>
      </div>

    </form>
  )
}