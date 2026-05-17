import { useState, useEffect } from 'react';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import MemoItem from '@/features/memo/ui/blocks/MemoItem';
import { useUpdateMemoWidgetMutation } from '@/features/memo/api/memo.queries';

interface MemoTeacherProps {
  memoWidgetId?: number;
  widgetName?: string;
  widgetDescription?: string;
  initialTitle?: string;
  initialMemo?: string;
  onTitleChange?: (title: string) => void;
  onMemoChange?: (memo: string) => void;
}

function MemoTeacher({
  memoWidgetId,
  widgetName = '메모장',
  widgetDescription = '위젯 설명',
  initialTitle = '',
  initialMemo = '',
  onTitleChange,
  onMemoChange,
}: MemoTeacherProps) {
  const [title, setTitle] = useState(initialTitle);
  const [memo, setMemo] = useState(initialMemo);
  const authToken = localStorage.getItem('authToken') ?? '';

  const updateMemoMutation = useUpdateMemoWidgetMutation(authToken);

  useEffect(() => {
    if (!memoWidgetId) return;

    const saveMemo = () => {
      updateMemoMutation.mutate({
        memoWidgetId,
        body: {
          title,
          content: memo,
        },
      });
    };

    const timer = setTimeout(saveMemo, 1000);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [title, memo, memoWidgetId, updateMemoMutation]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleMemoChange = (newMemo: string) => {
    setMemo(newMemo);
    onMemoChange?.(newMemo);
  };

  return (
    <div className="flex flex-col w-130">
      <div className="flex flex-row justify-between items-center px-4 py-3 h-[60px] bg-white border border-black-200 rounded-t-[20px]">
        <div className="flex flex-row items-center gap-3">
          <WidgetIcon iconName="note" size={36} />
          <div className="flex flex-col gap-1">
            <span className="body-medium text-black-500">{widgetName}</span>
            <span className="label-regular text-black-200">
              {widgetDescription}
            </span>
          </div>
        </div>
        <IconButton iconName="more" shape="square" />
      </div>
      <div className="flex flex-col items-start px-4 pt-4 pb-5 gap-2 bg-black-0 border-x border-b border-black-200 rounded-b-[20px] w-[520px]">
        <MemoItem
          title={title}
          memo={memo}
          isEditable
          onTitleChange={handleTitleChange}
          onMemoChange={handleMemoChange}
        />
      </div>
    </div>
  );
}

export default MemoTeacher;
