import { Icon } from '../../shared/enums/Icon';
import { SvgNotifications } from './SvgFiles/SvgNotifications';
import { SvgLessons } from './SvgFiles/SvgLessons';
import { SvgHomeWorks } from './SvgFiles/SvgHomeworks';
import { SvgSettings } from './SvgFiles/SvgSettings';
import { SvgBarrel } from './SvgFiles/SvgBarrel';
import { SvgCake } from './SvgFiles/SvgCake';
import { SvgCalendar } from './SvgFiles/SvgCalendar';
import { SvgChevron } from './SvgFiles/SvgChevron';
import { SvgComputer } from './SvgFiles/SvgComputer';
import { SvgCookie } from './SvgFiles/SvgCookie';
import { SvgArrow } from './SvgFiles/SvgArrow';
import { SvgPencil } from './SvgFiles/SvgPencil';
import { SvgExit } from './SvgFiles/SvgExit';
import { SvgBell } from './SvgFiles/SvgBell';
import { SvgPicture } from './SvgFiles/SvgPicture';
import { SvgPlus } from './SvgFiles/SvgPlus';
import { SvgCross } from './SvgFiles/SvgCross';

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
    case Icon.Pencil:
      return <SvgPencil />;
    case Icon.Exit:
      return <SvgExit />;
    case Icon.Bell:
      return <SvgBell />;
    case Icon.Picture:
      return <SvgPicture />;
    case Icon.Plus:
      return <SvgPlus />;
    case Icon.Arrow:
      return <SvgArrow />;
    case Icon.Cross:
      return <SvgCross />;
    default:
      return <></>;
  }
};
