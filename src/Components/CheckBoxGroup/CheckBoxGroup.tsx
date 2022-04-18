import { CheckboxBtn, CheckboxData } from "../CheckBoxGroup/CheckBox/Checkbox";

export type CheckboxGroupProps = {
  checkboxArr:  CheckboxData[]
}

export const CheckboxGroup = (props:CheckboxGroupProps) =>{
  return (
    <>
      {
        props.checkboxArr.map( (item) => (<CheckboxBtn data = {item}/>)) 
      }
    </>
  )
}