import './RadioButton.scss' 

export type RadioProps = {
  data: RadioData
  numberOfRadioGroup: number;
}

export type RadioData = {
  id: number
  text: string
  // value: number
}
 
export const RadioButton = (props: RadioProps) => { 
 
  return ( 
    <label className="radio-button" >
      <input type="radio" name={`radio${props.numberOfRadioGroup}`} value={props.data.id}/>
      <span className="radio-text">{props.data.text}</span>
    </label>
  ) 
};