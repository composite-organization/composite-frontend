import { useState } from 'react';
import Button from '@/shared/components/ui/button/Button';
import Input from '@/shared/components/ui/input/Input';
import Modal from '@/shared/components/ui/modal/Modal';
import SelectionAddButton from '@/shared/components/ui/selection-add-button/SelectionAddButton';
import SelectionList, { type VoteSelectionItem } from './blocks/SelectionList';
import Option, { type VoteOption } from './blocks/Option';

interface VoteCreateSubmitData {
  title: string;
  description: string;
  selections: VoteSelectionItem[];
  options: VoteOption[];
}

interface VoteCreateProps {
  isOpen: boolean;
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

function VoteCreate({ isOpen, onCancel, onSubmit }: VoteCreateProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selections, setSelections] = useState<VoteSelectionItem[]>([
    createEmptySelection(),
    createEmptySelection(),
  ]);
  const [voteOptions, setVoteOptions] = useState<VoteOption[]>(DEFAULT_OPTIONS);

  const handleAddSelection = () => {
    setSelections((previous) => [...previous, createEmptySelection()]);
  };

  const handleChangeLabel = (id: string, label: string) => {
    setSelections((previous) =>
      previous.map((selection) =>
        selection.id === id ? { ...selection, label } : selection,
      ),
    );
  };

  const handleRemoveSelection = (id: string) => {
    setSelections((previous) =>
      previous.filter((selection) => selection.id !== id),
    );
  };

  const handleToggleOption = (id: string, enabled: boolean) => {
    setVoteOptions((previous) =>
      previous.map((option) =>
        option.id === id ? { ...option, enabled } : option,
      ),
    );
  };

  const handleSubmit = () => {
    onSubmit({ title, description, selections, options: voteOptions });
  };

  return (
    <Modal title="투표" isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col gap-11 w-full">
        <Input
          title="안건"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="예: 홍길동"
        />
        <label
          htmlFor="vote-description"
          className="flex flex-col gap-2 w-full"
        >
          <span className="h3-semibold text-black-500">부가 설명</span>
          <div className="box-border flex flex-row items-center px-5 py-4 w-full h-20 border-2 border-black-200 rounded-xl">
            <textarea
              id="vote-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="예: 홍길동"
              className="flex-1 resize-none bg-transparent outline-none body-regular text-black-500 placeholder:text-black-200 h-full"
            />
          </div>
        </label>
        <fieldset className="flex flex-col items-center gap-3 w-full border-none p-0 m-0">
          <legend className="h3-semibold text-black-500 w-full">선택지</legend>
          <SelectionList
            variant="editable"
            selections={selections}
            onChangeLabel={handleChangeLabel}
            onRemove={handleRemoveSelection}
          />
          <SelectionAddButton onClick={handleAddSelection} className="w-full" />
        </fieldset>
        <Option options={voteOptions} onToggle={handleToggleOption} />
      </div>
      <div className="flex flex-row items-center gap-9 w-full">
        <Button
          variant="cancel"
          size="lg"
          onClick={onCancel}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          variant="blue"
          size="lg"
          onClick={handleSubmit}
          className="flex-1"
        >
          생성
        </Button>
      </div>
    </Modal>
  );
}

export default VoteCreate;
