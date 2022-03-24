import "./Checkbox.scss"

export type checkboxProps = {
data: checkboxData;

}

export type checkboxData = {
  numberOfChecboxGroup: number;
  value: number;
  text: string;
}

export const CheckboxBtn = (props: checkboxProps) => {
  return (
    <label className="custom-checkbox" > 
      <input type="checkbox" name={`checkbox${props.data.numberOfChecboxGroup}`} value={props.data.value}/> 
      <span className="custom-checkbox-text">{props.data.text}</span> 
    </label>

  )
}