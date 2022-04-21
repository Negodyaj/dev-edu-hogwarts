import './Checkbox.scss';

export type CheckboxProps = {
  data: CheckboxData;
};

export type CheckboxData = {
  name: string;
  value: number;
  text: string;
};

export const CheckboxBtn = (props: CheckboxProps) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" name={props.data.name} value={props.data.value} />
      <span className="custom-checkbox-text">{props.data.text}</span>
    </label>
  );
};
