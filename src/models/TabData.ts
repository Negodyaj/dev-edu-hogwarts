import { Icon } from '../shared/enums/Icon';
import { GroupsIcon } from '../components/SvgIcon/GroupsTabIcons';

export type TabData = {
  id: number;
  text: string;
  icon: Icon | GroupsIcon;
};
