import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import MemoItem from '@/features/memo/ui/blocks/MemoItem';

interface MemoTeacherProps {
  widgetName?: string;
  widgetDescription?: string;
  title?: string;
  content?: string;
}

function MemoTeacher({
  widgetName = '메모장',
  widgetDescription = '위젯 설명',
  title = '',
  content = '',
}: MemoTeacherProps) {
  return (
    <TeacherWidgetContainer
      iconName="note"
      title={widgetName}
      description={widgetDescription}
    >
      <div className="flex flex-col items-start px-4 pt-4 pb-5 gap-2">
        <MemoItem title={title} memo={content} isEditable={false} />
      </div>
    </TeacherWidgetContainer>
  );
}

export default MemoTeacher;
