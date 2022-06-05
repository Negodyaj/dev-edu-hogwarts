import { useState } from 'react';
import './FilterList.scss';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { SvgArrow } from '../SvgIcon/SvgFiles/SvgArrow';
import { AppState } from '../../store/store';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { useSelector } from 'react-redux';
import { DropDownWrapper } from './styled/DropDownWrapper';
import { DropDownList } from './styled/DropDownList';

export type FilterListProps = {
  data: FilterItem[];
  cssClass?: string;
  selected?: number;
  callback?: (item: any) => void;
  arrowHidden?: boolean;
  cssAlign?: Align;
  placeholder?: string;
};

export enum Align {
  Center = 'center',
  Left = 'left',
}

export type FilterItem = {
  id: number;
  name: string;
};

export const FilterList = (props: FilterListProps) => {
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  const filterData = props.data;
  const selectedItem = props.selected ? filterData.find((x) => x.id === props.selected) : undefined;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<FilterItem>(selectedItem ?? filterData[0]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  const clickOutside = useDetectClickOutside({ onTriggered: closeDropdown });

  const onElementClick = (elem: FilterItem) => {
    setItem(elem);
    props.callback?.(elem);
  };

  return (
    <DropDownWrapper ref={clickOutside} isDark={isDark}>
      {/* // <div className="drop-down-filter__wrapper flex-container" ref={clickOutside}> */}
      {/* <div
        className={`drop-down-filter flex-container ${props.cssClass ?? ''} ${
          props.cssAlign ?? ''
        }`} */}
      <DropDownList
        dropDownProps={props}
        isDark={isDark}
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
        data-lesson-id={item?.id}
      >
        {item?.name ? (
          <span>{item?.name}</span>
        ) : props.placeholder ? (
          <span className="placeholder">{props.placeholder}</span>
        ) : (
          ''
        )}
        {!props.arrowHidden && <SvgArrow direction={isOpen ? 'top' : 'bottom'} />}
      </DropDownList>

      {isOpen && (
        <div className={`drop-down-filter__list-wrapper ${props.cssAlign ?? 'right'}`}>
          <ul className={`drop-down-filter__list ${filterData.length > 4 ? 'overflow' : ''}`}>
            {filterData.map((elem) => (
              <li
                key={elem.id}
                className={`drop-down-filter__element ${elem.id === item?.id ? 'selected' : ''}`}
                onClick={() => onElementClick(elem)}
              >
                {elem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </DropDownWrapper>
  );
};
