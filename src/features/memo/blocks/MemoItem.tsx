import React from 'react';
import { cn } from '@/lib/utils';

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
      <div className="w-full">
        {isEditable ? (
          <input
            type="text"
            value={title}
            onChange={(event) => onTitleChange?.(event.target.value)}
            className="h3-semibold text-black-500 bg-transparent outline-none w-full"
            placeholder="제목을 입력하세요"
          />
        ) : (
          <p className="h3-semibold text-black-500">{title}</p>
        )}
      </div>
      <div
        className={cn(
          'flex flex-row items-center px-5 py-4 rounded-xl w-full h-28',
          isEditable ? 'border-2 border-blue-200' : 'border-2 border-black-200',
        )}
      >
        {isEditable ? (
          <textarea
            value={content}
            onChange={(event) => onContentChange?.(event.target.value)}
            className="body-regular text-black-500 bg-transparent outline-none resize-none w-full h-full"
            placeholder="내용을 입력하세요"
          />
        ) : (
          <p className="body-regular text-black-500 w-full overflow-auto">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

export default MemoItem;
