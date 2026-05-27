import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import OptionBadge from './blocks/OptionBadge';
import SelectionList, { type VoteSelectionItem } from './blocks/SelectionList';
import Footer from './blocks/Footer';

interface VoteTeacherProps {
  title: string;
  description: string;
  options: string[];
  selections: VoteSelectionItem[];
  isEnded?: boolean;
  selectedOptionIds?: number[];
  onStatusClick?: () => void;
  onStopClick?: () => void;
}

function VoteTeacher({
  title,
  description,
  options,
  selections,
  isEnded = false,
  selectedOptionIds,
  onStatusClick,
  onStopClick,
}: VoteTeacherProps) {
  return (
    <TeacherWidgetContainer iconName="vote" title={title} description="투표">
      <div className="flex flex-col gap-5 px-4 pt-4 pb-5">
        <div className="flex flex-row items-center gap-2.5 w-full">
          <p className="flex-1 body-regular text-black-500">{description}</p>
          <OptionBadge options={options} />
        </div>
        <SelectionList
          variant="teacher"
          selections={selections}
          selectedOptionIds={selectedOptionIds}
        />
        <Footer
          onStatusClick={onStatusClick}
          onSubmitClick={onStopClick}
          submitLabel="종료하기"
          statusLabel={isEnded ? '결과' : '현황'}
          isSubmitDisabled={isEnded}
        />
      </div>
    </TeacherWidgetContainer>
  );
}

export default VoteTeacher;
