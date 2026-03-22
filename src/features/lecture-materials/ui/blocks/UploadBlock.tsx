import { useRef, useState } from 'react';
import Icon from '@/shared/components/ui/icon/Icon';

interface UploadBlockProps {
  hasFiles: boolean;
  onUpload: (files: FileList) => void;
}

function UploadBlock({ hasFiles, onUpload }: UploadBlockProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onUpload(event.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onUpload(event.dataTransfer.files);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') handleClick();
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex flex-row items-center justify-center gap-3 px-2.5 py-3 rounded-xl cursor-pointer w-full h-17.5 transition-colors"
      style={
        hasFiles
          ? {
              backgroundColor: isDraggingOver ? '#fff3b0' : '#FFFADE',
              border: '2px solid #FFCC89',
            }
          : {
              backgroundColor: isDraggingOver ? '#d0d0d0' : '#E5E5E5',
            }
      }
    >
      <Icon
        name="upload"
        size={20}
        style={{ filter: hasFiles ? 'brightness(0.4)' : 'none' }}
      />
      <span
        className="body-regular"
        style={{ color: hasFiles ? '#525252' : '#000000' }}
      >
        클릭하여 파일 업로드
      </span>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadBlock;
