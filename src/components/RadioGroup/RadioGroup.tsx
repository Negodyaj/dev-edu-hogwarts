import { RadioButton, RadioData } from './RadioButton/RadioButton';
import './RadioGroup.scss';

export type RadioProps = {
  radioData: RadioData[];
  selected?: RadioData;
  name: string;
  callback?: (value: number) => void;
};

export const RadioGroup = (props: RadioProps) => {
  return (
    <div className="radio-group">
      {props.radioData.map((item) => {
        const select = props.selected?.value === item.value;
        return (
          <RadioButton
            key={item.value}
            nameOfRadioGroup={props.name}
            data={item}
            callback={props.callback}
            selected={props.selected && select}
          />
        );
      })}
    </div>
  );
};
