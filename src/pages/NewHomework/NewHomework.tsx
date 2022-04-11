import {Controller, FormProvider, useForm} from "react-hook-form";
import './NewHomework.scss'
import {RadioGroup} from "../../components/RadioGroup/RadioGroup";
import Datepicker from "../../components/Datepicker/Datepicker";
import {Button, ButtonModel, ButtonType} from "../../components/Button/Button";
import {baseWretch} from "../../services/base-wretch.service";
import {addNewTaskUrl} from "../../shared/consts";
import moment from "moment";
import {SvgIcon} from "../../components/SvgIcon/SvgIcon";
import {Icon} from "../../shared/enums/Icon";
import {useMemo, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/store";
import {AddLink, SetValueInInput} from "../../actions/newHomeworkForm.action";
import {AddedLink} from "./components/AddedLink";

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
    value: 510,
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

export const NewHomework = () => {
  const method = useForm<AddTaskFormData>();
  const dispatch = useDispatch();

  const {links, inputLinkValue} = useSelector((state: AppState) => state.newHomeworkFormState);
  let refLinkName = useRef<any>({})

  const memoizeMapLinks = useMemo(() => {
    return links.map((item, index) => {
      console.log('render links')
      return (
        <AddedLink key={index} itemNumber={index} source={item}/>
      )
    })
  }, [links])

  // Мне с бека пока нечего тащить, группы не достать,
  // номера заданий из групп не достать ибо в существующих сча в бд тоже нет заданий)

  const addLink = () => {
    if (
      inputLinkValue &&
      /^[a-z]+:\/\//i.test(inputLinkValue) &&
      !links.includes(inputLinkValue)
    )
      dispatch(AddLink(refLinkName.current.value));
  }

  const convertDate = (date: string) => {
    return moment(new Date(date)).format('DD.MM.YYYY').toString()
  }

  const onSubmit = (data: AddTaskFormData) => {

    const formData = {
      ...data,
      links: links.join(' [link] '),
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

  console.log('rerender')
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
                 placeholder='Введите название'
                 {...method.register("name", {required: true})}
          />
        </div>

        <div className='homework-form_area'>
          Описание задания
          <textarea className='form-input'
                    placeholder='Введите текст'
                    {...method.register("description", {required: true})}
          />
        </div>

        <div className='homework-form_area'>
          Полезные ссылки
          {
            links.length > 0 && memoizeMapLinks
          }
          <div className='form-input_link__container'>
            <textarea className='form-input form-input_link'
                      ref={refLinkName}
                      value={inputLinkValue}
                      onChange={event => dispatch(SetValueInInput(event.target.value))}
                      placeholder='Вставьте ссылку'
            />
            <div onClick={addLink}
                 className='form-input_link__button'
            >
              <SvgIcon icon={Icon.Plus}/>
            </div>
          </div>
        </div>

        <div className='buttons-group'>

          <Button text='Опубликовать' type={ButtonType.submit} model={ButtonModel.Colored}/>
          <Button text='Сохранить как черновик' type={ButtonType.submit} model={ButtonModel.White}/>
          <Button text='Отмена' type={ButtonType.reset} model={ButtonModel.Text} url={'/'}/>

        </div>

      </form>
    </FormProvider>
  )
}