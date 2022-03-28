import { RadioButton, RadioData } from "./RadioButton/RadioButton";
import './RadioGroup.scss';

export type RadioProps = {
  radioData: RadioData[]
}

export const RadioGroup = (props: RadioProps) => {
  
  return (
    <>
      <div className="radio-group">
        {
          props.radioData.map((item) => (<RadioButton data={item} />))
        }
      </div>    
    </>
  );
}
