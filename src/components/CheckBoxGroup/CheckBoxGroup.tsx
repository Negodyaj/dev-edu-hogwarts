import { CheckboxBtn, CheckboxData } from './CheckBox/CheckBox';

export type CheckboxGroupProps = {
  checkboxArr: CheckboxData[];
  name: string;
  defaultValue?: number[];
  required?: boolean;
};

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  return (
    <>
      {props.checkboxArr.map((item) => (
        <CheckboxBtn
          data={item}
          name={props.name}
          isSingle={props.checkboxArr.length < 2}
          key={item.value}
        />
      ))}
    </>
  );
};
