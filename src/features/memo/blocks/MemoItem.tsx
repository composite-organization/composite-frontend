import Input from '@/shared/components/ui/input/Input';

interface MemoItemProps {
  title: string;
  content: string;
  isEditable?: boolean;
  onTitleChange?: (value: string) => void;
  onContentChange?: (value: string) => void;
}

function MemoItem({
  title,
  content,
  isEditable = false,
  onTitleChange,
  onContentChange,
}: MemoItemProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
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
          value={content}
          onChange={(event) => onContentChange?.(event.target.value)}
          placeholder="내용을 입력하세요"
          rows={5}
        />
      ) : (
        <div className="flex flex-row items-center px-5 py-4 rounded-xl w-full h-28 border-2 border-black-200">
          <p className="body-regular text-black-500 w-full overflow-auto">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

export default MemoItem;
