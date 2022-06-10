import '../../LessonsPage/components/Lesson.scss';
// import classNames from 'classnames';
import { SvgArrow } from '../../../components/SvgIcon/SvgFiles/SvgArrow';
import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
// import { StyledButton } from '../../../components/Button/styled/StyledButton';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../../store/store';
// import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';
import { ButtonModel } from '../../../components/Button/Button';
import { StyledButton } from '../../../components/Button/styled/StyledButton';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { MainPanelState } from '../../../store/reducers/mainPanel.reducer';

// const cx = classNames.bind(styles);

export type LessonProps = {
  id: number;
  data: LessonModel;
  onClick: (id: number) => void;
  activeLessonId: number;
  isEditing: boolean;
};

export type LessonModel = {
  id: number;
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
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);

  const toggleAccordionItem = () => {
    props.onClick(lesson.serialNumber);
  };

  return (
    <div className="lesson-container">
      {props.isEditing && (
        <div className="link-wrapper">
          <LinkWithUnderline path={`new-lesson/unpublished/${lesson.id}`} text="Редактировать" />
        </div>
      )}
      <StyledButton
        className={isExpanded ? 'active' : ''}
        isDark={isDark}
        buttonProps={{ model: ButtonModel.EllipseWhite }}
        onClick={toggleAccordionItem}
      >
        <SvgArrow direction="bottom" />
      </StyledButton>
      <div className="header-container">
        <div className="lesson-main-info">
          <div className="lesson-name">{lesson.name}</div>
          <div className="lesson-date">{lesson.date}</div>
        </div>
        <div className="lesson-theme font-600">{lesson.theme}</div>
      </div>
      {isExpanded && (
        <div className="accordion-content-container">
          <div className="video-container">
            <div className="video-txt container-250">Ссылка на видео</div>
            <a className="video-link container-470" href={lesson.videoLink}>
              {lesson.videoLink}
            </a>
          </div>
          <div className="additional-container">
            <div className="video-txt">Дополнительные материалы</div>
            <div className="additional-info">{lesson.additionalInfo}</div>
          </div>
        </div>
      )}
    </div>
  );
};
