import { useState } from 'react';
import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import MemoItem from '@/features/memo/ui/blocks/MemoItem';

interface MemoTeacherProps {
  widgetName?: string;
  widgetDescription?: string;
  initialTitle?: string;
  initialMemo?: string;
}

function MemoTeacher({
  widgetName = '메모장',
  widgetDescription = '위젯 설명',
  initialTitle = '',
  initialMemo = '',
}: MemoTeacherProps) {
  const [title, setTitle] = useState(initialTitle);
  const [memo, setMemo] = useState(initialMemo);

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
          onTitleChange={setTitle}
          onMemoChange={setMemo}
        />
      </div>
    </TeacherWidgetContainer>
  );
}

export default MemoTeacher;
