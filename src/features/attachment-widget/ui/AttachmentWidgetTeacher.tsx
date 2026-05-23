import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import AttachmentBlock from './blocks/AttachmentBlock';
import UploadBlock from './blocks/UploadBlock';
import type { AttachmentWidget } from '../types';

interface AttachmentWidgetTeacherProps {
  attachments: AttachmentWidget[];
  onUpload: (files: FileList) => void;
  onDownload: (attachment: AttachmentWidget) => void;
  onDelete: (attachment: AttachmentWidget) => void;
}

function AttachmentWidgetTeacher({
  attachments,
  onUpload,
  onDownload,
  onDelete,
}: AttachmentWidgetTeacherProps) {
  return (
    <TeacherWidgetContainer
      iconName="file"
      title="강의 자료"
      description="강의 자료 위젯"
    >
      <div className="flex flex-col gap-5 px-4 pt-4 pb-5">
        <UploadBlock hasFiles={attachments.length > 0} onUpload={onUpload} />

        {attachments.length > 0 && (
          <ul className="flex flex-col gap-2 w-full">
            {attachments.map((attachment) => (
              <li key={attachment.id}>
                <AttachmentBlock
                  attachment={attachment}
                  showDeleteButton
                  onDownload={onDownload}
                  onDelete={onDelete}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </TeacherWidgetContainer>
  );
}

export default AttachmentWidgetTeacher;
