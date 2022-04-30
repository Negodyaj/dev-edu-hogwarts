import { useFormContext } from 'react-hook-form';
import './CheckBox.scss';

export type CheckboxProps = {
  data: CheckboxData;
  name: string;
  isSingle: boolean;
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
        checked={
          (props.isSingle && watch(props.name) == props.data.value) ||
          (!props.isSingle &&
            watch(props.name)?.find((x: number) => x === props.data.value))
        }
        {...register(props.name, {
          required: true,
        })}
      />
      <span className="custom-checkbox-text">{props.data.text}</span>
    </label>
  );
};
