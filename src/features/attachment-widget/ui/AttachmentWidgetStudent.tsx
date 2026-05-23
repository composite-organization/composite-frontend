import { StudentWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import EmptyFileIllustration from './components/EmptyFileIllustration';
import AttachmentBlock from './blocks/AttachmentBlock';
import type { AttachmentWidget } from '../types';

interface AttachmentWidgetStudentProps {
  attachments: AttachmentWidget[];
  onDownload: (attachment: AttachmentWidget) => void;
}

function AttachmentWidgetStudent({
  attachments,
  onDownload,
}: AttachmentWidgetStudentProps) {
  return (
    <StudentWidgetContainer
      iconName="file"
      title="강의 자료"
      description="강의 자료 위젯"
    >
      <div className="flex flex-col items-center gap-5 px-4 pt-4 pb-5">
        {attachments.length === 0 ? (
          <div className="flex flex-col items-center gap-2.5 py-2.5">
            <EmptyFileIllustration />
            <span className="body-medium text-black-200">
              공유된 강의자료가 없습니다
            </span>
          </div>
        ) : (
          <ul className="flex flex-col gap-2 w-full">
            {attachments.map((attachment) => (
              <li key={attachment.id}>
                <AttachmentBlock
                  attachment={attachment}
                  onDownload={onDownload}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </StudentWidgetContainer>
  );
}

export default AttachmentWidgetStudent;
