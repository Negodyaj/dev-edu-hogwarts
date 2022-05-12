import React from 'react';
import './TabItem.scss';
import { CoursesTabIcons } from '../../SvgIcon/CoursesTabIcons';
import { TabData } from '../../../models/TabData';
import { GroupsSvgIcon, GroupsTabIcons } from '../../SvgIcon/GroupsTabIcons';

export type TabProps = {
  data: TabData;
  activeTab: number;
  onClick: (id: number) => void;
  course?: boolean;
  group?: boolean;
};

export const TabItem = (props: TabProps) => {
  return (
    <>
      <div
        className={`tab-item ${props.data.id === props.activeTab ? 'active-tab' : ''}`}
        onClick={() => props.onClick(props.data.id)}
      >
        {props.course && <CoursesTabIcons courseName={props.data.text} />}
        {props.group && <GroupsSvgIcon icon={GroupsTabIcons[props.data.icon]} />}
        <div>{props.data.text}</div>
      </div>
    </>
  );
};
