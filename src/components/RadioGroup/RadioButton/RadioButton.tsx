import './RadioButton.scss' 

export type RadioProps = {
  data: RadioData
}
 
export type RadioData = { 
  text: string; 
  value: number; 
  numberOfRadioGroup: number;
} 
 
export const RadioButton = (props: RadioProps) => { 
 
  return ( 
    <label className="radio-button" >
      <input type="radio" name={`radio${props.data.numberOfRadioGroup}`} value={props.data.value}/>
      <span className="radio-text">{props.data.text}</span>
    </label>
  ) 
};