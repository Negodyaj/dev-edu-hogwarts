import { HomeworkCardContent } from '../HomeworksPage/components/HomeworkCardContent';
import { HomeworkCard } from '../HomeworksPage/components/HomeworkCard';
import { BackButton } from '../../components/LinkArrow/BackButton';
import './HomeworkCardPage.scss';

export const HomeworkEditPage = () => {
  return (
    <div className="homework-edit-page">
      <BackButton />
      <HomeworkCard>
        <HomeworkCardContent />
      </HomeworkCard>
    </div>
  );
};
