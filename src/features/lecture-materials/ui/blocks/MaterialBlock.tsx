import Icon from '@/shared/components/ui/icon/Icon';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import { formatUploadedAt } from '@/lib/formatDate';
import type { LectureMaterial } from '../../types';

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

interface MaterialBlockProps {
  material: LectureMaterial;
  showDeleteButton?: boolean;
  onDownload: (material: LectureMaterial) => void;
  onDelete?: (material: LectureMaterial) => void;
}

function MaterialBlock({
  material,
  showDeleteButton = false,
  onDownload,
  onDelete,
}: MaterialBlockProps) {
  return (
    <div className="flex flex-row items-center justify-between px-3 py-3 bg-black-0 border border-black-200 rounded-xl w-full">
      <div className="flex flex-row items-center gap-3">
        <div className="relative flex items-center justify-center w-7 h-7 bg-widget-file rounded-lg shrink-0">
          <Icon name="file" size={12} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="label-medium text-black-500 truncate max-w-23.75">
            {material.name}
          </span>
          <span className="caption-regular text-black-200">
            {formatFileSize(material.size)} ·{' '}
            {formatUploadedAt(material.uploadedAt)}
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-1">
        <IconButton
          size="small"
          iconName="download"
          onClick={() => onDownload(material)}
        />

        {showDeleteButton && (
          <IconButton
            size="small"
            iconName="delete"
            onClick={() => onDelete?.(material)}
          />
        )}
      </div>
    </div>
  );
}

export default MaterialBlock;
