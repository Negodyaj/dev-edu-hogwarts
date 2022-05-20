import { SvgBackend } from './SvgFiles/CoursesIcons/SvgBackend';
import { SvgBaseCourse } from './SvgFiles/CoursesIcons/SvgBaseCourse';
import { SvgFrontend } from './SvgFiles/CoursesIcons/SvgFrontend';
import { SvgCalendar } from './SvgFiles/CoursesIcons/SvgCalendar';

export enum CourseIcon {
  Base = 1,
  BaseJava,
  Backend,
  BackendJava,
  Frontend,
  QA,
}

export type DictionaryData = {
  courseName?: string;
};

export const CoursesTabIcons = (props: DictionaryData) => {
  switch (props.courseName) {
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
