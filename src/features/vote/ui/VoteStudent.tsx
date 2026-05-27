import { useState } from 'react';
import { StudentWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import OptionBadge from './blocks/OptionBadge';
import SelectionList, { type VoteSelectionItem } from './blocks/SelectionList';
import Footer from './blocks/Footer';

interface VoteStudentProps {
  title: string;
  description: string;
  options: string[];
  selections: VoteSelectionItem[];
  isMultipleChoice: boolean;
  isEnded?: boolean;
  selectedOptionIds?: number[];
  onSubmit: (selectedIds: string[]) => void;
  onStatusClick?: () => void;
}

function VoteStudent({
  title,
  description,
  options,
  selections,
  isMultipleChoice,
  isEnded = false,
  selectedOptionIds,
  onSubmit,
  onStatusClick,
}: VoteStudentProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    if (isMultipleChoice) {
      setSelectedIds((previous) =>
        previous.includes(id)
          ? previous.filter((selectedId) => selectedId !== id)
          : [...previous, id],
      );
    } else {
      setSelectedIds((previous) => (previous.includes(id) ? [] : [id]));
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedIds);
  };

  return (
    <StudentWidgetContainer iconName="vote" title={title} description="투표">
      <div className="box-border flex flex-col gap-5 px-4 pt-4 pb-5">
        <div className="flex flex-row items-center gap-2.5 w-full">
          <p className="flex-1 body-regular text-black-500">{description}</p>
          <OptionBadge options={options} />
        </div>
        <SelectionList
          variant="student"
          selections={selections}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          isEnded={isEnded}
          selectedOptionIds={selectedOptionIds}
        />
        <Footer
          onStatusClick={onStatusClick}
          onSubmitClick={handleSubmit}
          submitLabel="제출하기"
          isSubmitDisabled={isEnded || selectedIds.length === 0}
        />
      </div>
    </StudentWidgetContainer>
  );
}

export default VoteStudent;
