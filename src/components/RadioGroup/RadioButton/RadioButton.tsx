import './RadioButton.scss' 

export type RadioProps = {
  data: RadioData
}
 
export type RadioData = { 
  name: string 
  id: number 
  numberOfRadioGroup: number
} 
 
export const RadioButton = (props: RadioProps) => { 
 
  return ( 
    <label className="radio-button" >
      <input type="radio" name={`radio${props.data.numberOfRadioGroup}`} value={props.data.id}/>
      <span className="radio-text">{props.data.name}</span>
    </label>
  ) 
};