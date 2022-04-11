
import "./InputText.scss";

export type InputTextProps = {
  placeholder: string
}

export const InputText = (props: InputTextProps) => {
  return (
    <div className="input-text">
      <input placeholder={props.placeholder}></input>
    </div>
  )
}