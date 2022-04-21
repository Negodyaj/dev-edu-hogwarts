import { Icon } from '../shared/enums/Icon';
import { SvgNotifications } from './SvgIcon/SvgFiles/SvgNotifications';
import { SvgLessons } from './SvgIcon/SvgFiles/SvgLessons';
import { SvgHomeWorks } from './SvgIcon/SvgFiles/SvgHomeworks';
import { SvgSettings } from './SvgIcon/SvgFiles/SvgSettings';
import { SvgBarrel } from './SvgIcon/SvgFiles/SvgBarrel';
import { SvgCake } from './SvgIcon/SvgFiles/SvgCake';
import { SvgCalendar } from './SvgIcon/SvgFiles/SvgCalendar';
import { SvgChevron } from './SvgIcon/SvgFiles/SvgChevron';
import { SvgComputer } from './SvgIcon/SvgFiles/SvgComputer';
import { SvgCookie } from './SvgIcon/SvgFiles/SvgCookie';
import { SvgTick } from './SvgIcon/SvgFiles/SvgTick';

export type SvgIconProps = {
  icon: Icon;
};

export const SvgIcon = (props: SvgIconProps) => {
  switch (props.icon) {
    case Icon.Barrel:
      return <SvgBarrel />;
    case Icon.Cake:
      return <SvgCake />;
    case Icon.Calendar:
      return <SvgCalendar />;
    case Icon.Chevron:
      return <SvgChevron />;
    case Icon.Computer:
      return <SvgComputer />;
    case Icon.Cookie:
      return <SvgCookie />;
    case Icon.Notifications:
      return <SvgNotifications />;
    case Icon.Lessons:
      return <SvgLessons />;
    case Icon.Homeworks:
      return <SvgHomeWorks />;
    case Icon.Settings:
      return <SvgSettings />;
    case Icon.Tick:
      return <SvgTick />;
    default:
      return <></>;
  }
};
