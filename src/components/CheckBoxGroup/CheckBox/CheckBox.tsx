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

  const check = () => {
    if (props.isSingle) {
      return props.data.isChecked;
    }
    return watch(props.name)?.find((x: number) => x === props.data.value);
  };

  return (
    <label className="custom-checkbox">
      <InvisibleInput
        type="checkbox"
        value={props.data.value}
        checked={check()}
        onClick={props.onClick}
        {...register(props.name, {
          required: props.required,
        })}
      />
      <span className="custom-checkbox-text">{props.data.text}</span>
    </label>
  );
};
