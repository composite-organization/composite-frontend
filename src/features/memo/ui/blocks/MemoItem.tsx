import Input from '@/shared/components/ui/input/Input';

interface MemoItemProps {
  title: string;
  memo: string;
  isEditable?: boolean;
  onTitleChange?: (value: string) => void;
  onMemoChange?: (value: string) => void;
}

function MemoItem({
  title,
  memo,
  isEditable = false,
  onTitleChange,
  onMemoChange,
}: MemoItemProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {isEditable ? (
        <Input
          variant="bare"
          value={title}
          onChange={(event) => onTitleChange?.(event.target.value)}
          placeholder="제목을 입력하세요"
          className="h3-semibold text-black-500"
        />
      ) : (
        <p className="h3-semibold text-black-500">{title}</p>
      )}
      {isEditable ? (
        <Input
          multiline
          value={memo}
          onChange={(event) => onMemoChange?.(event.target.value)}
          placeholder="메모를 입력하세요"
          rows={5}
        />
      ) : (
        <div className="flex flex-row items-start px-5 py-4 rounded-xl w-full min-h-28 border-2 border-black-200">
          <p className="body-regular text-black-500 w-full">{memo}</p>
        </div>
      )}
    </div>
  );
}

export default MemoItem;
