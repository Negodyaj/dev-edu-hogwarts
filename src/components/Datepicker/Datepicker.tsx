import {useState} from 'react';
import Datetime from 'react-datetime';
import './Datepicker.scss';
import 'moment/locale/ru';
import {SvgLessons} from "../SvgIcon/SvgFiles/SvgLessons";

type DPprops = {
  field?: any
}

const Datepicker = (props: DPprops) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Datetime locale='ru'
              {...props.field}
              initialValue={new Date()}
              renderInput={(propsInput: string, openCalendar: Function) => {
                return (
                  <div className={`date-picker form-input ${isOpen ? 'active-dp' : ''}`}
                       onFocus={() => setIsOpen(true)}
                       onBlur={() => setIsOpen(false)}>

                    <input type='text'
                           onFocus={() => setIsOpen(true)}
                           onBlur={() => setIsOpen(false)}
                           {...propsInput}
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
              timeFormat={false}
    />
  );
}

export default Datepicker;