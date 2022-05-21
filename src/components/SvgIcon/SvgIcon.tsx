import { Icon } from '../../shared/enums/Icon';
import { SvgNotifications } from './SvgFiles/SvgNotifications';
import { SvgLessons } from './SvgFiles/SvgLessons';
import { SvgHomeWorks } from './SvgFiles/SvgHomeworks';
import { SvgSettings } from './SvgFiles/SvgSettings';
import { SvgCalendar } from './SvgFiles/CoursesIcons/SvgCalendar';
import { SvgArrow } from './SvgFiles/SvgArrow';
import { SvgPencil } from './SvgFiles/SvgPencil';
import { SvgExit } from './SvgFiles/SvgExit';
import { SvgBell } from './SvgFiles/SvgBell';
import { SvgPicture } from './SvgFiles/SvgPicture';
import { SvgPlus } from './SvgFiles/SvgPlus';
import { SvgCross } from './SvgFiles/SvgCross';
import { SvgNotepad } from './SvgFiles/SvgNotepad';
import { SvgGroups } from './SvgFiles/SvgGroups';
import { SvgNewGroup } from './SvgFiles/SvgNewGroup';
import { SvgAllUsers } from './SvgFiles/SvgAllUsers';
import { SvgUsersList } from './SvgFiles/SvgUsersList';
import { SvgPaymentTable } from './SvgFiles/SvgPaymentTable';
import { SvgAddNewLesson } from './SvgFiles/SvgAddNewLesson';
import { SvgAddNewHomework } from './SvgFiles/SvgAddNewHomework';
import { SvgCheckHomeworks } from './SvgFiles/SvgCheckHomeworks';
import { SvgGeneralProgress } from './SvgFiles/SvgGeneralProgress';
import { SvgButtonFly } from './SvgFiles/SvgButtonFly';

export type SvgIconProps = {
  icon: Icon;
};

export const SvgIcon = (props: SvgIconProps) => {
  switch (props.icon) {
    case Icon.Calendar:
      return <SvgCalendar />;
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
    case Icon.Notepad:
      return <SvgNotepad />;
    case Icon.Groups:
      return <SvgGroups />;
    case Icon.NewGroup:
      return <SvgNewGroup />;
    case Icon.Students:
      return <SvgUsersList />;
    case Icon.Payment:
      return <SvgPaymentTable />;
    case Icon.AllUsers:
      return <SvgAllUsers />;
    case Icon.AddNewLesson:
      return <SvgAddNewLesson />;
    case Icon.AddNewHomework:
      return <SvgAddNewHomework />;
    case Icon.CheckHomeworks:
      return <SvgCheckHomeworks />;
    case Icon.GeneralProgress:
      return <SvgGeneralProgress />;
    case Icon.ButtonFly:
      return <SvgButtonFly />;
    default:
      return <></>;
  }
};
