import './RadioButton.scss';
import { useFormContext } from 'react-hook-form';

export type RadioProps = {
  data: RadioData;
  nameOfRadioGroup: string;
  callback?: (value: number) => void;
};

export type RadioData = {
  text: string;
  value: number;
};

export const RadioButton = (props: RadioProps) => {
  const { register } = useFormContext();

  function onRadioClick(id: number) {
    return props.callback?.(id);
  }

  return (
    <label className="radio-button">
      <input
        type="radio"
        value={props.data.value}
        onClick={() => onRadioClick(props.data.value)}
        {...register(`${props.nameOfRadioGroup}`)}
      />
      <span className="radio-text">{props.data.text}</span>
    </label>
  );
};
