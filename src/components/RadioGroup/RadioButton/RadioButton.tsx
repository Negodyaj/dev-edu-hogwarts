import './RadioButton.scss'
import {useFormContext} from "react-hook-form";

export type RadioProps = {
  data: RadioData
  nameOfRadioGroup: string
}

export type RadioData = {
  text: string
  value: number
}
 
export const RadioButton = (props: RadioProps) => {
  const { register } = useFormContext();
 
  return ( 
    <label className="radio-button" >
      <input type="radio" value={props.data.value} {...register(`${props.nameOfRadioGroup}`)}/>
      <span className="radio-text">{props.data.text}</span>
    </label>
  ) 
};