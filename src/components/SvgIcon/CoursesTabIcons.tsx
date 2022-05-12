import { SvgBackend } from './SvgFiles/SvgBackend';
import { SvgBarrel } from './SvgFiles/SvgBarrel';
import { SvgBaseCourse } from './SvgFiles/SvgBaseCourse';
import { SvgFrontend } from './SvgFiles/SvgFrontend';

export type DictionaryData = {
  courseName?: string;
};

export const CoursesTabIcons = (props: DictionaryData) => {
  switch (props.courseName) {
    case 'Базовый курс':
      return <SvgBaseCourse />;
    case 'Специализация Backend':
      return <SvgBackend />;
    case 'Специализация Frontend':
      return <SvgFrontend />;
    case 'Backend':
      return <SvgBackend />;
    case 'Frontend':
      return <SvgFrontend />;
    case 'QA automation':
      return <SvgBarrel />;
    case 'Специализация':
      return <SvgBackend />;
    default:
      return <></>;
  }
};
