import styles from '../../LessonsPage/components/Lesson.scss';
import classNames from 'classnames';
import { SvgArrow } from '../../../components/SvgIcon/SvgFiles/SvgArrow';

const cx = classNames.bind(styles);

export type LessonProps = {
  id: number;
  data: LessonModel;
  onClick: (id: number) => void;
  activeLessonId: number;
};

export type LessonModel = {
  serialNumber: number;
  name: string;
  date: string;
  theme: string;
  videoLink: string;
  additionalInfo: string;
};

export const Lesson = (props: LessonProps) => {
  const lesson = props.data;
  const isExpanded = props.activeLessonId === lesson.serialNumber;

  const toggleAccordionItem = () => {
    props.onClick(lesson.serialNumber);
  };

  return (
    <div className="lesson-container">
      <div className="header-container">
        <div className="lesson-main-info">
          <div className="lesson-name">{lesson.name}</div>
          <div className="lesson-date">{lesson.date}</div>
        </div>
        <div className="lesson-theme font-600">{lesson.theme}</div>

        <button className={cx('circle', { 'is-active': isExpanded })} onClick={toggleAccordionItem}>
          <SvgArrow direction="bottom" />
        </button>
      </div>
      {isExpanded && (
        <div className="accordion-content-container">
          <div className="video-container grid">
            <div className="video-txt container-250">Ссылка на видео</div>

            <a className="video-link container-470" href={lesson.videoLink}>
              Смотреть
            </a>
          </div>

          <div className="additional-container grid">
            <div className="additional-txt">Дополнительные материалы</div>
            <div className="additional-info">{lesson.additionalInfo}</div>
          </div>
        </div>
      )}
    </div>
  );
};
