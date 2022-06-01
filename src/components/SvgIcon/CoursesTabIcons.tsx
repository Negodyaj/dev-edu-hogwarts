import { SvgBackend } from './SvgFiles/CoursesIcons/SvgBackend';
import { SvgBaseCourse } from './SvgFiles/CoursesIcons/SvgBaseCourse';
import { SvgFrontend } from './SvgFiles/CoursesIcons/SvgFrontend';
import { SvgCalendar } from './SvgFiles/CoursesIcons/SvgCalendar';

export enum CourseIcon {
  Base = 1370,
  BaseJava = 2374,
  Backend = 2371,
  BackendJava = 2375,
  Frontend = 1371,
  QA = 2376,
}

export type DictionaryData = {
  icon?: string;
};

export const CoursesTabIcons = (props: DictionaryData) => {
  switch (props.icon) {
    case 'Base':
      return <SvgBaseCourse />;
    case 'BaseJava':
      return <SvgBaseCourse />;
    case 'Backend':
      return <SvgBackend />;
    case 'BackendJava':
      return <SvgBackend />;
    case 'Frontend':
      return <SvgFrontend />;
    default:
      return <SvgCalendar />;
  }
};
