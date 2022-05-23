import './InputLink.scss';
import '../InputTextarea/InputTextarea.scss';
import { useFormContext } from 'react-hook-form';
import { SvgButtonFly } from '../SvgIcon/SvgFiles/SvgButtonFly';

export type InputLinkProps = {
  placeholder: string;
  inputName?: string;
  inputValue?: string;
};

export const InputLink = (props: InputLinkProps) => {
  const { register } = useFormContext();

  return (
    <div className="input-link">
      <input
        placeholder={props.placeholder}
        defaultValue={props.inputValue}
        {...register(`${props.inputName}`)}
      />
      <button className="button-fly">
        <SvgButtonFly />
      </button>
    </div>
  );
};
