import {forwardRef, useState} from 'react';
import Datetime from 'react-datetime';
import './Datepicker.scss';
import 'moment/locale/ru';
import {SvgLessons} from "../SvgIcon/SvgFiles/SvgLessons";
import {UseFormRegister} from "react-hook-form";
import {AddTaskFormData} from "../../pages/IssuingHomework/IssuingHomework";

const Datepicker = forwardRef<HTMLInputElement,{ label: string } & ReturnType<UseFormRegister<AddTaskFormData>>>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Datetime locale='ru'
              initialValue={new Date()}
              renderInput={(propsInput: string, openCalendar: Function) => {
                return (
                  <div className={`date-picker form-input ${isOpen ? 'active-dp' : ''}`}
                       onBlur={() => setIsOpen(false)}>

                    <input type='text' {...propsInput}
                           onChange={props.onChange}
                           onFocus={() => setIsOpen(true)}
                           onBlur={props.onBlur}
                           ref={ref}
                    />

                    <button className='date-picker__button'
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpen(true);
                              openCalendar();
                            }}
                            onBlur={() => setIsOpen(false)}>

                      <SvgLessons/>

                    </button>
                  </div>
                )
              }}
              dateFormat="DD.MM.YYYY"
              timeFormat={false}/>
  );
})

export default Datepicker;