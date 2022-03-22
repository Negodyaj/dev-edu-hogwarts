import { CheckboxGroup } from "../../Components/checkbox/CheckBoxGroup/CheckBoxGroup"

export const HomeworksPage = () => {
  return (

    <div>Домашки
      <CheckboxGroup checkboxArr={[
        {
          numberOfChecboxGroup: 1,
          value: 1,
          text: "первый"
        },
        {
          numberOfChecboxGroup: 1,
          value: 2,
          text: "первый"
        },
        {
          numberOfChecboxGroup: 1,
          value: 3,
          text: "первый"
        },
      ]}
      />
    </div>
  )
}