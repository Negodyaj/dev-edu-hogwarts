import './InputLink.scss';
import '../InputTextarea/InputTextarea.scss';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { SvgButtonFly } from '../SvgIcon/SvgFiles/SvgButtonFly';
import { Input } from '../styled/Input';

export type InputLinkProps = {
  placeholder: string;
  inputName: string;
  inputValue?: string;
  rules?: RegisterOptions;
};

export const InputLink = (props: InputLinkProps) => {
  const { register } = useFormContext();

  return (
    <div className="input-link">
      <Input
        type="text"
        name={props.inputName}
        register={register}
        rules={props.rules}
        placeholder={props.placeholder}
        defaultValue={props.inputValue}
      />
      <button className="button-fly">
        <SvgButtonFly />
      </button>
    </div>
  );
};
