import React from 'react';
import './TabItem.scss';
import { IconsTabs } from '../../../pages/HomeworksPage/IconsTabs';
import { TabData } from '../../../models/TabData';

export type TabProps = {
  data: TabData;
  activeTab: number;
  onClick: (id: number) => void;
};

export const TabItem = (props: TabProps) => {
  return (
    <>
      <div
        className={`tab-item ${props.data.id === props.activeTab ? 'active-tab' : ''}`}
        onClick={() => props.onClick(props.data.id)}
      >
        <IconsTabs courseName={props.data.text} />
        <div>{props.data.text}</div>
      </div>
    </>
  );
};
