import React from 'react';
import './TabItem.scss';
import { CoursesTabIcons } from '../../SvgIcon/CoursesTabIcons';
import { TabData } from '../../../models/TabData';
import { GroupsSvgIcon } from '../../SvgIcon/GroupsTabIcons';
import { StyledTabItem } from '../styled/StyledTabItem';
import { AppState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';

export type TabProps = {
  data: TabData;
  activeTab: number;
  onClick: (id: number) => void;
  course?: boolean;
  group?: boolean;
};

export const TabItem = (props: TabProps) => {
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  return (
    <StyledTabItem
      isDark={isDark}
      className={`tab-item ${props.data.id === props.activeTab ? 'active-tab' : ''}`}
      onClick={() => props.onClick(props.data.id)}
    >
      {props.course && <CoursesTabIcons icon={props.data.icon} />}
      {props.group && <GroupsSvgIcon icon={props.data.icon} />}
      <div>{props.data.text}</div>
    </StyledTabItem>
  );
};
