import React, { ChangeEvent, useState } from 'react';
import Datetime from 'react-datetime';
import './Datepicker.scss';
import 'moment/locale/ru';
import { SvgLessons } from "../SvgIcon/SvgFiles/SvgLessons";
import {  useFormContext, useController, UseControllerProps } from 'react-hook-form';
import {UserFormData} from '../../pages/SettingsPage/SettingsPage';




export const Datepicker = (props: UseControllerProps<UserFormData>) => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useFormContext();
  const { field } = useController(props);
  return (
    <Datetime locale='ru'
      {...props}
      initialValue={new Date()}
      renderInput={(props: string, openCalendar: Function) => {
        return (
          <div className={`date-picker form-input ${isOpen ? 'active-dp' : ''}`}>

            <input {...field} d type='text' {...methods.register('birthDate')}  {...props}


            />

            <button onClick={() => { setIsOpen(true); openCalendar(); }}
              onBlur={() => setIsOpen(false)}>

              <SvgLessons />

            </button>
          </div>
        )
      }}
      dateFormat="DD.MM.YYYY"
      timeFormat={false} />
  );
};