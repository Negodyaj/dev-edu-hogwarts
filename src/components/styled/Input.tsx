import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { AppState } from '../../store/store';
import { StyledInput } from './StyledInput';

export type InputProps = {
  defaultValue?: any;
  name: string;
  width?: string;
  textAlign?: string;
  placeholder?: string;
  type: string;
  customClassName?: string;
  isInvalid?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  readonly?: boolean;
};
export const Input = (props: InputProps) => {
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  return (
    <>
      <StyledInput
        readOnly={props.readonly}
        placeholder={props.placeholder}
        type={props.type}
        inputProps={props}
        width={props.width}
        isDark={isDark}
        defaultValue={props.defaultValue}
        className={`form-input ${props.customClassName ? props.customClassName : ''}`}
        {...props.register(`${props.name}`, props.rules)}
      />
    </>
  );
};
