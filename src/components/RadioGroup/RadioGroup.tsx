import { RadioButton, RadioData } from "./RadioButton/RadioButton";
import './RadioGroup.scss';

export type RadioProps = {
  radioData: Array<RadioData>
}

export const RadioGroup = (radioProps: RadioProps) => {
  
  return (
      <div className="radio-group">
        {
          radioProps.radioData.map((item) => (<RadioButton key={item.value} numberOfRadioGroup={radioProps.radioData.length} data={item} />))
        }
      </div>
  );
}
