import { RadioButton, RadioData } from "../RadioButton/RadioButton";
import './RadioGroup.scss' ;
//  RadioGroup, который на вход принимает массив объектов, состоящих из label: string и value: number
export const RadioGroup = () => {
  
  const tabData: RadioData[] = [ 
  {
    value: 1,
    text: 'группа 1',
    id: 1,
  },
  {
    value: 2,
    text: 'группа 2',
    id: 2,
  },
 
]

  return (
    <>
      <div className="radio-group">
        {
          tabData.map((item) => (<RadioButton data={item} key={item.id}/>))
        }
      </div>    
    </>
  );
}
