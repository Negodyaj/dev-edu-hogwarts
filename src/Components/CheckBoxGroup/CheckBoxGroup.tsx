import { CheckboxBtn, CheckboxData } from '../CheckBoxGroup/CheckBox/Checkbox';

export type CheckboxGroupProps = {
  checkboxArr: CheckboxData[];
  name: string;
};

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  return (
    <>
      {
        props.checkboxArr.map((item) => (
          <CheckboxBtn
            data={item}
            name={props.name}
            isSingle={props.checkboxArr.length < 2}
          />
        ))
      }
    </>
  );
};
