import { useCallback, useState } from 'react';
import Button from '@/shared/components/ui/button/Button';
import Input from '@/shared/components/ui/input/Input';
import SelectionAddButton from '@/shared/components/ui/selection-add-button/SelectionAddButton';
import SelectionList, {
  VoteSelectionItem,
} from './blocks/selection-list/SelectionList';
import Option, { VoteOption } from './blocks/option/Option';

interface VoteCreateSubmitData {
  title: string;
  description: string;
  selections: VoteSelectionItem[];
  options: VoteOption[];
}

interface VoteCreateProps {
  onCancel: () => void;
  onSubmit: (data: VoteCreateSubmitData) => void;
}

const DEFAULT_OPTIONS: VoteOption[] = [
  { id: 'anonymous', label: '익명', enabled: false },
  { id: 'multiple', label: '복수선택', enabled: false },
];

function createEmptySelection(): VoteSelectionItem {
  return { id: crypto.randomUUID(), label: '' };
}

function VoteCreate({ onCancel, onSubmit }: VoteCreateProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selections, setSelections] = useState<VoteSelectionItem[]>([
    createEmptySelection(),
    createEmptySelection(),
  ]);
  const [voteOptions, setVoteOptions] = useState<VoteOption[]>(DEFAULT_OPTIONS);

  const handleAddSelection = useCallback(() => {
    setSelections((previous) => [...previous, createEmptySelection()]);
  }, []);

  const handleChangeLabel = useCallback((id: string, label: string) => {
    setSelections((previous) =>
      previous.map((selection) =>
        selection.id === id ? { ...selection, label } : selection,
      ),
    );
  }, []);

  const handleRemoveSelection = useCallback((id: string) => {
    setSelections((previous) =>
      previous.filter((selection) => selection.id !== id),
    );
  }, []);

  const handleToggleOption = useCallback((id: string, enabled: boolean) => {
    setVoteOptions((previous) =>
      previous.map((option) =>
        option.id === id ? { ...option, enabled } : option,
      ),
    );
  }, []);

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    [],
  );

  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    onSubmit({ title, description, selections, options: voteOptions });
  }, [onSubmit, title, description, selections, voteOptions]);

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-8 w-[500px] bg-black-0 rounded-[28px]">
      <div className="flex flex-row justify-between items-center w-full h-[52px]">
        <h2 className="h2-semibold text-black-500 flex-1 text-center">투표</h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label="닫기"
          className="flex flex-col items-center justify-center p-2 w-8 h-8 rounded-lg hover:bg-black-50 transition-colors cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line
              x1="1"
              y1="1"
              x2="15"
              y2="15"
              stroke="#1E1E1E"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <line
              x1="15"
              y1="1"
              x2="1"
              y2="15"
              stroke="#1E1E1E"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-11 w-full">
        <Input
          title="안건"
          value={title}
          onChange={handleTitleChange}
          placeholder="예: 홍길동"
        />
        <div className="flex flex-col gap-2 w-full">
          <span className="h3-semibold text-black-500">부가 설명</span>
          <div className="box-border flex flex-row items-center px-5 py-4 w-full h-20 border-2 border-black-200 rounded-xl">
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="예: 홍길동"
              className="flex-1 resize-none bg-transparent outline-none body-regular text-black-500 placeholder:text-black-200 h-full"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 w-full">
          <span className="h3-semibold text-black-500 w-full">선택지</span>
          <SelectionList
            variant="editable"
            selections={selections}
            onChangeLabel={handleChangeLabel}
            onRemove={handleRemoveSelection}
          />
          <SelectionAddButton onClick={handleAddSelection} className="w-full" />
        </div>
        <Option options={voteOptions} onToggle={handleToggleOption} />
      </div>

      <div className="flex flex-row items-center gap-9 w-full">
        <Button
          variant="cancel"
          size="xl"
          onClick={onCancel}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          variant="blue"
          size="xl"
          onClick={handleSubmit}
          className="flex-1"
        >
          생성
        </Button>
      </div>
    </div>
  );
}

export default VoteCreate;
