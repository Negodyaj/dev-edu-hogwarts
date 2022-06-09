import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { AppState } from '../../store/store';
import { StyledTextarea } from './StyledTextarea';

export type TextareaProps = {
  name?: string;
  placeholder?: string;
  value?: string;
  customClassName?: string;
  isInvalid?: boolean;
  required?: boolean;
  rules?: RegisterOptions;
  register: UseFormRegister<any> | any;
};
export const Textarea = (props: TextareaProps) => {
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  return (
    <>
      {!props.register ? (
        <StyledTextarea
          value={props.value}
          placeholder={props.placeholder}
          textareaProps={props}
          isDark={isDark}
          className={`form-input ${props.customClassName ? props.customClassName : ''}`}
        />
      ) : (
        <StyledTextarea
          placeholder={props.placeholder}
          isDark={isDark}
          textareaProps={props}
          className={`form-input ${props.customClassName ? props.customClassName : ''}`}
          {...props.register(`${props.name}`, props.rules)}
        />
      )}
    </>
  );
};
