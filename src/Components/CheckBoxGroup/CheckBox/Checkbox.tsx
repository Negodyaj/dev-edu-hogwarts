import { useFormContext } from 'react-hook-form';
import './Checkbox.scss';

export type CheckboxProps = {
  data: CheckboxData;
  name: string;
};

export type CheckboxData = {
  value: number;
  text: string;
  isChecked: boolean;
};

export const CheckboxBtn = (props: CheckboxProps) => {
  const { register, watch } = useFormContext();
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        value={props.data.value}
        checked={watch(props.name)?.find((x: number) => x === props.data.value)}
        {...register(props.name, { required: true })}
      />
      <span className="custom-checkbox-text">{props.data.text}</span>
    </label>
  );
};
