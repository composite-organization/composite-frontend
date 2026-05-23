import Icon from '@/shared/components/ui/icon/Icon';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import { formatUploadedAt } from '@/lib/formatDate';
import type { AttachmentWidget } from '../../types';

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

interface AttachmentBlockProps {
  attachment: AttachmentWidget;
  showDeleteButton?: boolean;
  onDownload: (attachment: AttachmentWidget) => void;
  onDelete?: (attachment: AttachmentWidget) => void;
}

function AttachmentBlock({
  attachment,
  showDeleteButton = false,
  onDownload,
  onDelete,
}: AttachmentBlockProps) {
  return (
    <div className="flex flex-row items-center justify-between px-3 py-3 bg-black-0 border border-black-200 rounded-xl w-full">
      <div className="flex flex-row items-center gap-3">
        <div className="relative flex items-center justify-center w-7 h-7 bg-widget-file rounded-lg shrink-0">
          <Icon name="file" size={12} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="label-medium text-black-500 truncate max-w-23.75">
            {attachment.name}
          </span>
          <span className="caption-regular text-black-200">
            {formatFileSize(attachment.size)} ·{' '}
            {formatUploadedAt(attachment.uploadedAt)}
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-1">
        <IconButton
          size="small"
          iconName="download"
          onClick={() => onDownload(attachment)}
        />

        {showDeleteButton && (
          <IconButton
            size="small"
            iconName="delete"
            onClick={() => onDelete?.(attachment)}
          />
        )}
      </div>
    </div>
  );
}

export default AttachmentBlock;
