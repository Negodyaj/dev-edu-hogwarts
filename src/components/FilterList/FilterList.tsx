import { useState } from 'react';
import './FilterList.scss';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';

export type FilterListProps = {
  data: Array<Filter>;
  type: string;
};

export type Filter = {
  id: number;
  name: string;
};

export const FilterList = (props: FilterListProps) => {
  const filter = props.data;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Filter>(filter[0]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  const clickOutside = useDetectClickOutside({ onTriggered: closeDropdown });

  return (
    <div className="drop-down-filter__wrapper" ref={clickOutside}>
      <div
        className={`drop-down-filter ${props.type}`}
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
        data-lesson-id={item.id}
      >
        {item.name}

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
                className={`drop-down-filter__element ${
                  elem.id === item.id ? 'selected' : ''
                }`}
                onClick={() => setItem(elem)}
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
