import { RadioButton, RadioData } from './RadioButton/RadioButton';
import './RadioGroup.scss';

export type RadioProps = {
  radioData: Array<RadioData>;
  name: string;
  callback?: (value: number) => void;
};

export const RadioGroup = (props: RadioProps) => {
  return (
    <div className="radio-group">
      {props.radioData.map((item) => (
        <RadioButton
          key={item.value}
          nameOfRadioGroup={props.name}
          data={item}
          callback={props.callback}
        />
      ))}
    </div>
  );
};
