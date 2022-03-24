import { CheckboxBtn, checkboxData } from "../CheckBoxGroup/CheckBox/Checkbox";

export type checkboxGroupProps = {
  checkboxArr: Array <checkboxData>
}

export const CheckboxGroup = (props:checkboxGroupProps) =>{
  return (
    <div>
      {
        props.checkboxArr.map( (item) => (<CheckboxBtn data = {item}/>)) 

      }
    </div>
  )
}