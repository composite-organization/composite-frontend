import { useRef, useState } from 'react';
import Icon from '@/shared/components/ui/icon/Icon';

interface UploadBlockProps {
  hasFiles: boolean;
  onUpload: (files: FileList) => void;
}

function UploadBlock({ hasFiles, onUpload }: UploadBlockProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onUpload(event.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onUpload(event.dataTransfer.files);
    }
  };

  return (
    <label
      htmlFor="file-upload-input"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex flex-row items-center justify-center gap-3 px-2.5 py-3 rounded-xl cursor-pointer w-full h-17.5 transition-colors border-2"
      style={{
        backgroundColor: isDraggingOver ? '#FFFADE' : '#E5E5E5',
        borderColor: isDraggingOver ? '#FFCC89' : 'transparent',
      }}
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
        id="file-upload-input"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}

export default UploadBlock;
