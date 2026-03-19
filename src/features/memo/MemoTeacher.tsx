import { useState } from 'react';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import MemoItem from '@/features/memo/blocks/MemoItem';

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
    <div className="flex flex-col w-[520px]">
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
          onTitleChange={setTitle}
          onMemoChange={setMemo}
        />
      </div>
    </div>
  );
}

export default MemoTeacher;
