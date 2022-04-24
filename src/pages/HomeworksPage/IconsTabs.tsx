import { SvgBackend } from '../../components/SvgIcon/SvgFiles/SvgBackend';
import { SvgBarrel } from '../../components/SvgIcon/SvgFiles/SvgBarrel';
import { SvgBaseCourse } from '../../components/SvgIcon/SvgFiles/SvgBaseCourse';
import { SvgFrontend } from '../../components/SvgIcon/SvgFiles/SvgFrontend';

export type DictionaryData = {
  courseName?: string;
};

export const IconsTabs = (props: DictionaryData) => {
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
