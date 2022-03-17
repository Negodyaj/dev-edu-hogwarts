import {useState} from 'react';
import Datetime from 'react-datetime';
import './Datepicker.scss';
import 'moment/locale/ru';
import {SvgLessons} from "../SvgIcon/SvgFiles/SvgLessons";

export const Datepicker = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Datetime locale='ru'
              initialValue={new Date()}
              renderInput={(props: string, openCalendar: Function) => {
                return (
                  <div className={`date-picker form-input ${isOpen ? 'active-dp' : ''}`}>

                    <input type='text' {...props}
                           onChange={(e) => e.preventDefault()}
                           onFocus={() => setIsOpen(true)}
                           onBlur={() => setIsOpen(false)}/>

                    <button onClick={() => { setIsOpen(true); openCalendar(); }}
                            onBlur={() => setIsOpen(false)}>

                      {/* #8A8A8A */}

                      <SvgLessons/>

                    </button>
                  </div>
                )
              }}
              dateFormat="DD.MM.YYYY"
              timeFormat={false}/>
  );
}