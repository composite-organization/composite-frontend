import { useCallback, useState } from 'react';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import OptionBadge from './blocks/option-badge/OptionBadge';
import SelectionList, {
  VoteSelectionItem,
} from './blocks/selection-list/SelectionList';
import Footer from './blocks/footer/Footer';

interface VoteStudentProps {
  title: string;
  description: string;
  options: string[];
  selections: VoteSelectionItem[];
  isMultipleChoice: boolean;
  onSubmit: (selectedIds: string[]) => void;
  onStatusClick?: () => void;
}

function VoteStudent({
  title,
  description,
  options,
  selections,
  isMultipleChoice,
  onSubmit,
  onStatusClick,
}: VoteStudentProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = useCallback(
    (id: string) => {
      if (isMultipleChoice) {
        setSelectedIds((previous) =>
          previous.includes(id)
            ? previous.filter((selectedId) => selectedId !== id)
            : [...previous, id],
        );
      } else {
        setSelectedIds((previous) => (previous.includes(id) ? [] : [id]));
      }
    },
    [isMultipleChoice],
  );

  const handleSubmit = useCallback(() => {
    onSubmit(selectedIds);
  }, [onSubmit, selectedIds]);

  return (
    <div className="relative w-[520px]">
      <div className="absolute top-0 left-0 w-full h-[60px] box-border flex flex-row justify-between items-center px-4 py-3 bg-white border border-black-200 rounded-[20px_20px_0_0]">
        <div className="flex flex-row items-center gap-3">
          <WidgetIcon iconName="vote" size={36} />
          <div className="flex flex-col gap-1">
            <span className="body-medium text-black-500">{title}</span>
            <span className="label-regular text-black-200">투표</span>
          </div>
        </div>
      </div>
      <div className="absolute top-[60px] left-0 w-full box-border flex flex-col gap-5 px-4 pt-4 pb-5 bg-black-0 border-[0_1px_1px_1px] border-black-200 rounded-[0_0_20px_20px]">
        <div className="flex flex-row items-center gap-2.5 w-full">
          <p className="flex-1 body-regular text-black-500">{description}</p>
          <OptionBadge options={options} />
        </div>
        <SelectionList
          variant="student"
          selections={selections}
          selectedIds={selectedIds}
          onSelect={handleSelect}
        />
        <Footer
          onStatusClick={onStatusClick}
          onSubmitClick={handleSubmit}
          submitLabel="제출하기"
          isSubmitDisabled={selectedIds.length === 0}
        />
      </div>
    </div>
  );
}

export default VoteStudent;
