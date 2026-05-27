import { StudentWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import MemoItem from '@/features/memo/ui/blocks/MemoItem';

interface MemoStudentProps {
  widgetName?: string;
  widgetDescription?: string;
  title: string;
  memo: string;
}

function MemoStudent({
  widgetName = '메모장',
  widgetDescription = '위젯 설명',
  title,
  memo,
}: MemoStudentProps) {
  return (
    <StudentWidgetContainer
      iconName="note"
      title={widgetName}
      description={widgetDescription}
    >
      <div className="flex flex-col items-start px-4 pt-4 pb-5 gap-2">
        <MemoItem title={title} memo={memo} isEditable={false} />
      </div>
    </StudentWidgetContainer>
  );
}

export default MemoStudent;
