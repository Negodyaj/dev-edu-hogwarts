import { useEffect, useRef, useState } from 'react';
import './SelectList.scss';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useFormContext } from 'react-hook-form';

export type SelectListProps = {
  data: Array<Filter>;
  type: string;
  name: string;
};

export type Filter = {
  id: number;
  name: string;
};

export const SelectList = (props: SelectListProps) => {
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
  const { register } = useFormContext();

  // useEffect(() => {
  //   const element = document.getElementById(props.name);
  //   if (element) {
  //     // (element as HTMLSelectElement).value = item?.id as unknown as string;
  //     (element as HTMLSelectElement).options[(element as HTMLSelectElement).selectedIndex].value=item.id as unknown as string;
  //   }
  // }, [item]);

  return (
    <div className="drop-down-filter__wrapper" ref={clickOutside}>
      <select
        id={props.name}
        className="html-select"
        {...register(props.name, { required: true })}
      >
        <option selected key={item?.id} value={item?.id}>
          {item?.name}
        </option>
        )
        {/* {
          filter.map(item=>
          <option key={item?.id} value={item?.id}>
            {item?.name}
          </option>)
          } */}
      </select>
      <div
        className={`drop-down-filter ${props.type}`}
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
        data-lesson-id={item?.id}
      >
        {item?.name}

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={isOpen ? 'array-down' : 'array-up'}
          onClick={() => toggle()}
        >
          <path d="M10.7071 7.29289C10.3166 6.90237 9.68342 6.90237 9.29289 7.29289C8.90237 7.68342 8.90237 8.31658 9.29289 8.70711L10.7071 7.29289ZM14 12L14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L14 12ZM9.29289 15.2929C8.90237 15.6834 8.90237 16.3166 9.29289 16.7071C9.68342 17.0976 10.3166 17.0976 10.7071 16.7071L9.29289 15.2929ZM9.29289 8.70711L13.2929 12.7071L14.7071 11.2929L10.7071 7.29289L9.29289 8.70711ZM13.2929 11.2929L9.29289 15.2929L10.7071 16.7071L14.7071 12.7071L13.2929 11.2929Z" />
        </svg>
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
