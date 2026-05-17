import { useState, useEffect } from 'react';
import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
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
    <TeacherWidgetContainer
      iconName="note"
      title={widgetName}
      description={widgetDescription}
      width="w-[520px]"
    >
      <div className="flex flex-col items-start px-4 pt-4 pb-5 gap-2">
        <MemoItem
          title={title}
          memo={memo}
          isEditable
          onTitleChange={handleTitleChange}
          onMemoChange={handleMemoChange}
        />
      </div>
    </TeacherWidgetContainer>
  );
}

export default MemoTeacher;
