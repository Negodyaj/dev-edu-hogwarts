import {useForm, FormProvider, Controller} from "react-hook-form";
import './IssuingHomework.scss'
import {RadioGroup} from "../../components/RadioGroup/RadioGroup";
import Datepicker from "../../components/Datepicker/Datepicker";
import {Button, ButtonModel, ButtonType} from "../../components/Button/Button";
import {baseWretch} from "../../services/base-wretch.service";
import {addNewTaskUrl} from "../../shared/consts";
import moment from "moment";

export type AddTaskFormData = {
  name: string
  description: string
  homework: {
    startDate: string
    endDate: string
  }
  groupId: number   
}

const groups = [
  {
    value: 1,
    text: 'gr 1',
  },
  {
    value: 2,
    text: 'gr 2',
  },
  {
    value: 3,
    text: 'gr 3',
  }
]

export const IssuingHomework = () => {
  const method = useForm<AddTaskFormData>()

  // Мне с бека пока нечего тащить, группы не достать,
  // номера заданий из групп не достать ибо в существующих сча в бд тоже нет заданий)

  const convertDate = (date: string) => {
    return moment(new Date(date)).format('DD.MM.YYYY').toString()
  }

  const onSubmit = (data: AddTaskFormData) => {

    const formData = {
      ...data,
      links: '',
      isRequired: true,
      homework: {
        startDate: convertDate(data.homework.startDate),
        endDate: convertDate(data.homework.endDate)
      }
    }

    baseWretch()
      .url(addNewTaskUrl)
      .post(formData)
  }

  // Нет эндпоинта
  // const saveDraft = () => {
  // };

  return (
    <FormProvider {...method}>
    <form className='form-container homework-form' onSubmit={method.handleSubmit(onSubmit)}>
      <span className='homework-form_title'>Новое задание</span>

      <div className='homework-form_area'>
        Номер группы:
        <RadioGroup radioData={groups} name='groupId'/>
      </div>

      <div className='homework-form_area'>
        Номер задания:
        {/* Не ясно как это передавать, точнее в теле метода нет такого поля) */}
        <span className='homework-form_task'>1</span>
      </div>

      <div className='homework-form_dates'>
        <div>
          Дата выдачи задания
          <Controller
            name="homework.startDate"
            control={method.control}
            rules={{required: true}}
            render={({field}) => <Datepicker field={field}/>}
          />
        </div>
        <div>
          Срок сдачи задания
          <Controller
            name="homework.endDate"
            control={method.control}
            rules={{required: true}}
            render={({field}) => <Datepicker field={field}/>}
          />
        </div>
      </div>

      <div className='homework-form_area'>
        Название задания
        <input className='form-input' type="text"
               placeholder='Введите название' {...method.register("name", {required: true})}/>
      </div>

      <div className='homework-form_area'>
        Описание задания
        <textarea className='form-input' placeholder='Введите текст' {...method.register("description", {required: true})}/>
      </div>

      <div>

        <Button text='Опубликовать' model={ButtonModel.Colored} type={ButtonType.submit}/>
        <Button text='Сохранить как черновик' model={ButtonModel.White} type={ButtonType.submit}/>
        <Button text='Отмена' model={ButtonModel.Text} url={'/'} type={ButtonType.button}/>

      </div>

    </form>
    </FormProvider>
  )
}