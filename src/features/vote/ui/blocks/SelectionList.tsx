import { cn } from '@/lib/utils';
import SelectionButton from '@/shared/components/ui/selection-button/SelectionButton';
import Input from '@/shared/components/ui/input/Input';

export interface VoteSelectionItem {
  id: string;
  label: string;
  voteCount?: number;
  votedPercentage?: number;
}

interface StudentSelectionListProps {
  selections: VoteSelectionItem[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  isEnded?: boolean;
  selectedOptionIds?: number[];
}

interface TeacherSelectionListProps {
  selections: VoteSelectionItem[];
  selectedOptionIds?: number[];
}

interface EditableSelectionListProps {
  selections: VoteSelectionItem[];
  onChangeLabel: (id: string, label: string) => void;
  onRemove: (id: string) => void;
}

export type SelectionListVariant = 'student' | 'teacher' | 'editable';

type SelectionListProps =
  | ({ variant: 'student' } & StudentSelectionListProps)
  | ({ variant: 'teacher' } & TeacherSelectionListProps)
  | ({ variant: 'editable' } & EditableSelectionListProps);

function StudentList({
  selections,
  selectedIds,
  onSelect,
  isEnded = false,
  selectedOptionIds,
}: StudentSelectionListProps) {
  return (
    <ul className="flex flex-col gap-2.5 w-full">
      {selections.map((selection, index) => {
        const isWinner =
          selectedOptionIds?.includes(Number(selection.id)) ?? false;
        const isHighlighted = isEnded
          ? isWinner
          : selectedIds.includes(selection.id);
        const handleClick = isEnded ? undefined : () => onSelect(selection.id);
        return (
          <li
            key={selection.id}
            className="flex flex-row items-center gap-2 w-full"
          >
            <SelectionButton
              label={String(index + 1)}
              variant={isHighlighted ? 'selected' : 'default'}
              onClick={handleClick}
              ariaLabel={`선택지 ${index + 1}: ${selection.label}`}
            />
            <div className="relative flex-1">
              <button
                type="button"
                onClick={handleClick}
                disabled={isEnded}
                className={cn(
                  'flex flex-row items-center px-5 py-4 h-12 w-full rounded-xl border-2 overflow-hidden',
                  isHighlighted ? 'border-blue-300' : 'border-black-200',
                  isEnded ? 'cursor-default' : 'cursor-pointer',
                )}
                style={
                  selection.votedPercentage !== undefined
                    ? {
                        background: `linear-gradient(90deg, rgba(0, 24, 236, 0.17) ${selection.votedPercentage}%, #FEFEFE ${selection.votedPercentage}%)`,
                      }
                    : {}
                }
              >
                <span className="flex-1 text-left body-medium text-black-500">
                  {selection.label}
                </span>
                {selection.voteCount !== undefined && (
                  <span className="absolute right-5 top-4 body-medium text-black-200">
                    {selection.voteCount}명
                  </span>
                )}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function TeacherList({
  selections,
  selectedOptionIds,
}: TeacherSelectionListProps) {
  return (
    <ul className="flex flex-col gap-2.5 w-full">
      {selections.map((selection, index) => {
        const isWinner =
          selectedOptionIds?.includes(Number(selection.id)) ?? false;
        return (
          <li
            key={selection.id}
            className="flex flex-row items-center gap-2 w-full"
          >
            <div className="relative">
              {isWinner && (
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-12"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12 L1 3 L5 6 L10 2 L15 6 L19 3 L18 12 Z"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="0.6"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <SelectionButton
                label={String(index + 1)}
                variant="default"
                ariaLabel={`선택지 ${index + 1}: ${selection.label}`}
              />
            </div>
            <div className="relative flex-1">
              <div
                className="flex flex-row items-center px-5 py-4 h-12 rounded-xl border-2 border-black-200 overflow-hidden"
                style={
                  selection.votedPercentage !== undefined
                    ? {
                        background: `linear-gradient(90deg, rgba(0, 24, 236, 0.17) ${selection.votedPercentage}%, #FEFEFE ${selection.votedPercentage}%)`,
                      }
                    : {}
                }
              >
                <span className="flex-1 text-left body-medium text-black-500">
                  {selection.label}
                </span>
                {selection.voteCount !== undefined && (
                  <span className="absolute right-5 top-4 body-medium text-black-200">
                    {selection.voteCount}명
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function EditableList({
  selections,
  onChangeLabel,
  onRemove,
}: EditableSelectionListProps) {
  return (
    <ul className="flex flex-col gap-3 w-full">
      {selections.map((selection, index) => (
        <li
          key={selection.id}
          className="flex flex-row items-center gap-1 w-full"
        >
          <Input
            value={selection.label}
            onChange={(event) =>
              onChangeLabel(selection.id, event.target.value)
            }
            placeholder={`선택지 ${index + 1}`}
            wrapperClassName="flex-1"
          />
          <button
            type="button"
            onClick={() => onRemove(selection.id)}
            aria-label={`선택지 ${index + 1} 삭제`}
            className="flex flex-row items-center justify-center w-9 h-12 rounded-[20px] bg-black-0 hover:bg-black-50 transition-colors cursor-pointer"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="1"
                x2="11"
                y2="11"
                stroke="#1E1E1E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1="11"
                y1="1"
                x2="1"
                y2="11"
                stroke="#1E1E1E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}

function SelectionList({ variant, ...rest }: SelectionListProps) {
  if (variant === 'student') {
    const { selections, selectedIds, onSelect, isEnded, selectedOptionIds } =
      rest as StudentSelectionListProps;
    return (
      <StudentList
        selections={selections}
        selectedIds={selectedIds}
        onSelect={onSelect}
        isEnded={isEnded}
        selectedOptionIds={selectedOptionIds}
      />
    );
  }
  if (variant === 'teacher') {
    const { selections, selectedOptionIds } = rest as TeacherSelectionListProps;
    return (
      <TeacherList
        selections={selections}
        selectedOptionIds={selectedOptionIds}
      />
    );
  }
  const { selections, onChangeLabel, onRemove } =
    rest as EditableSelectionListProps;
  return (
    <EditableList
      selections={selections}
      onChangeLabel={onChangeLabel}
      onRemove={onRemove}
    />
  );
}

export default SelectionList;
