import React, { ChangeEvent, useState } from 'react';
import Datetime from 'react-datetime';
import './Datepicker.scss';
import 'moment/locale/ru';
import { SvgLessons } from "../SvgIcon/SvgFiles/SvgLessons";
import {  useFormContext, useController, UseControllerProps } from 'react-hook-form';
import {UserFormData} from '../../pages/SettingsPage/SettingsPage';

export type DPProps={
  field : any;
};


export const Datepicker = (props: DPProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Datetime locale='ru'
      {...props.field}
      initialValue={new Date()}
      renderInput={(props: string, openCalendar: Function) => {
        return (
          <div className={`date-picker form-input ${isOpen ? 'active-dp' : ''}`}>

            <input  type='text' {...props}


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