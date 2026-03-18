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
}

interface TeacherSelectionListProps {
  selections: VoteSelectionItem[];
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
}: StudentSelectionListProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {selections.map((selection, index) => {
        const isSelected = selectedIds.includes(selection.id);
        return (
          <div
            key={selection.id}
            className="flex flex-row items-center gap-2 w-full"
          >
            <SelectionButton
              label={String(index + 1)}
              variant={isSelected ? 'selected' : 'default'}
              onClick={() => onSelect(selection.id)}
              ariaLabel={`선택지 ${index + 1}: ${selection.label}`}
            />
            <div className="relative flex-1">
              <div
                role="button"
                tabIndex={0}
                onClick={() => onSelect(selection.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    onSelect(selection.id);
                  }
                }}
                className={cn(
                  'flex flex-row items-center px-5 py-4 h-12 rounded-xl border-2 overflow-hidden cursor-pointer',
                  isSelected ? 'border-blue-300' : 'border-black-200',
                )}
                style={
                  selection.votedPercentage !== undefined
                    ? {
                        background: `linear-gradient(90deg, rgba(0, 24, 236, 0.17) ${selection.votedPercentage}%, #FEFEFE ${selection.votedPercentage}%)`,
                      }
                    : {}
                }
              >
                <span className="flex-1 body-medium text-black-500">
                  {selection.label}
                </span>
                {selection.voteCount !== undefined && (
                  <span className="absolute right-5 top-4 body-medium text-black-200">
                    {selection.voteCount}명
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TeacherList({ selections }: TeacherSelectionListProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {selections.map((selection, index) => (
        <div
          key={selection.id}
          className="flex flex-row items-center gap-2 w-full"
        >
          <SelectionButton
            label={String(index + 1)}
            variant="default"
            ariaLabel={`선택지 ${index + 1}: ${selection.label}`}
          />
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
              <span className="flex-1 body-medium text-black-500">
                {selection.label}
              </span>
              {selection.voteCount !== undefined && (
                <span className="absolute right-5 top-4 body-medium text-black-200">
                  {selection.voteCount}명
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EditableList({
  selections,
  onChangeLabel,
  onRemove,
}: EditableSelectionListProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {selections.map((selection, index) => (
        <div
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
        </div>
      ))}
    </div>
  );
}

function SelectionList({ variant, ...rest }: SelectionListProps) {
  if (variant === 'student') {
    const { selections, selectedIds, onSelect } =
      rest as StudentSelectionListProps;
    return (
      <StudentList
        selections={selections}
        selectedIds={selectedIds}
        onSelect={onSelect}
      />
    );
  }
  if (variant === 'teacher') {
    const { selections } = rest as TeacherSelectionListProps;
    return <TeacherList selections={selections} />;
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
