import { useState, useEffect, useRef } from 'react';
import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import MemoItem from '@/features/memo/ui/blocks/MemoItem';
import {
  useUpdateMemoWidgetMutation,
  useCreateMemoWidgetMutation,
} from '@/features/memo/api/memo.queries';

interface MemoTeacherProps {
  memoWidgetId?: number;
  lessonId?: number;
  widgetName?: string;
  widgetDescription?: string;
  initialTitle?: string;
  initialMemo?: string;
  onMemoWidgetIdChange?: (id: number) => void;
  onTitleChange?: (title: string) => void;
  onMemoChange?: (memo: string) => void;
}

function MemoTeacher({
  memoWidgetId: initialMemoWidgetId,
  lessonId,
  widgetName = '메모장',
  widgetDescription = '위젯 설명',
  initialTitle = '',
  initialMemo = '',
  onMemoWidgetIdChange,
  onTitleChange,
  onMemoChange,
}: MemoTeacherProps) {
  const [title, setTitle] = useState(initialTitle);
  const [memo, setMemo] = useState(initialMemo);
  const [memoWidgetId, setMemoWidgetId] = useState(initialMemoWidgetId);
  const isSavingRef = useRef(false);
  const authToken = localStorage.getItem('authToken') ?? '';

  const createMemoMutation = useCreateMemoWidgetMutation(authToken);
  const updateMemoMutation = useUpdateMemoWidgetMutation(authToken);

  useEffect(() => {
    if (isSavingRef.current) return;

    const saveMemo = () => {
      isSavingRef.current = true;
      if (!memoWidgetId && lessonId) {
        createMemoMutation.mutate(
          {
            lessonId,
            title,
            content: memo,
          },
          {
            onSuccess: (createdMemo) => {
              setMemoWidgetId(createdMemo.id);
              onMemoWidgetIdChange?.(createdMemo.id);
              isSavingRef.current = false;
            },
            onError: () => {
              isSavingRef.current = false;
            },
          },
        );
      } else if (memoWidgetId) {
        updateMemoMutation.mutate(
          {
            memoWidgetId,
            body: {
              title,
              content: memo,
            },
          },
          {
            onSettled: () => {
              isSavingRef.current = false;
            },
          },
        );
      }
    };

    const timer = setTimeout(saveMemo, 1000);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [
    title,
    memo,
    memoWidgetId,
    lessonId,
    createMemoMutation,
    updateMemoMutation,
    onMemoWidgetIdChange,
  ]);

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
