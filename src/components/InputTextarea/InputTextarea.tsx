import './InputTextarea.scss';
import { SvgButtonFly } from '../SvgIcon/SvgFiles/SvgButtonFly';

export type InputTextareaProps = {
  placeholder: string;
};

export const InputTextarea = (props: InputTextareaProps) => {
  return (
    <div className="input-textarea">
      <textarea placeholder={props.placeholder} />
      <button className="button-fly">
        <SvgButtonFly />
      </button>
    </div>
  );
};
