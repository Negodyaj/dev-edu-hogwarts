import { useState } from 'react';
import './SelectList.scss';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useFormContext } from 'react-hook-form';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';

export type SelectListProps = {
  data: Array<FilterItem>;
  cssClass?: string;
  callback?: (item: any) => void;
  name: string;
};

export type FilterItem = {
  id: number;
  name: string;
};

export const SelectList = (props: SelectListProps) => {
  const filter = props.data;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<FilterItem>(filter[0]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  const clickOutside = useDetectClickOutside({ onTriggered: closeDropdown });

  const { register } = useFormContext();

  const onElementClick = (elem: FilterItem) => {
    setItem(elem);
    const isElem = (thing: FilterItem) => {
      return thing.id === elem.id;
    };
    const i = filter.findIndex(isElem);
    console.log(i);
    const a = (document.getElementById(props.name) as HTMLSelectElement)
      .selectedIndex;
    console.log(
      (document.getElementById(props.name) as HTMLSelectElement).selectedIndex
    );
    (document.getElementById(props.name) as HTMLSelectElement).options[
      a
    ].selected = false;
    (document.getElementById(props.name) as HTMLSelectElement).options[
      i
    ].selected = true;
    console.log(
      (document.getElementById(props.name) as HTMLSelectElement).selectedIndex
    );
  };

  return (
    <div className="drop-down-filter__wrapper" ref={clickOutside}>
      <select
        {...register(props.name, { required: true })}
        id={props.name}
        className="html-select"
      >
        {filter.map((it) => (
          <option key={it?.id} value={it?.id} data-lesson-id={it?.id}>
            {it?.name}
          </option>
        ))}
      </select>
      <div
        className={`drop-down-filter ${props.cssClass ?? ''}`}
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
        data-lesson-id={item?.id}
      >
        {item?.name}
        <SvgArrow direction="bottom" />
      </div>
      {isOpen && (
        <div className="drop-down-filter__list-wrapper">
          <ul
            className={`drop-down-filter__list ${
              filter.length > 4 ? 'overflow' : ''
            }`}
          >
            {filter.map((elem) => (
              <li
                key={elem.id}
                value={elem.id}
                className={`drop-down-filter__element ${
                  elem.id === item?.id ? 'selected' : ''
                }`}
                onClick={() => onElementClick(elem)}
              >
                {elem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
