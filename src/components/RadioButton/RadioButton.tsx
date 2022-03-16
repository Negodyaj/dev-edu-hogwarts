import './RadioButton.scss' 

export type RadioProps = {
  data: RadioData
}
 
export type RadioData = { 
  id: number; 
  text: string; 
  value: number; 
} 
 
export const RadioButton = (props: RadioProps) => { 
 
  return ( 
    <label className="radio-button" >
      <input type="radio" name="radio" value={props.data.value}/>
      <span className="radio-text">{props.data.text}</span>
    </label>
  ) 
};