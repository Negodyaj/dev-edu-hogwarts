import { useFormContext } from 'react-hook-form';
import { InvisibleInput } from '../../styled/InvisibleInput';
import './CheckBox.scss';

export type CheckboxProps = {
  data: CheckboxData;
  name: string;
  isSingle: boolean;
  onClick?: () => void;
  defaultValue?: number[];
  required?: boolean;
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
      {props.required ? (
        <InvisibleInput
          type="checkbox"
          value={props.data.value}
          checked={
            (props.isSingle ? props.data.isChecked : watch(props.name) == props.data.value) ||
            (!props.isSingle && watch(props.name)?.find((x: number) => x === props.data.value))
          }
          {...register(props.name)}
          onChange={props.onClick}
        />
      ) : (
        <InvisibleInput
          type="checkbox"
          value={props.data.value}
          checked={
            (props.isSingle ? props.data.isChecked : watch(props.name) == props.data.value) ||
            (!props.isSingle && watch(props.name)?.find((x: number) => x === props.data.value))
          }
          {...register(props.name, {
            required: true,
          })}
          onChange={props.onClick}
        />
      )}
      <span className="custom-checkbox-text">{props.data.text}</span>
    </label>
  );
};
