import IconButton from '@/shared/components/ui/icon-button/IconButton';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import MaterialBlock from './blocks/MaterialBlock';
import UploadBlock from './blocks/UploadBlock';
import type { LectureMaterial } from '../types';

interface LectureMaterialsTeacherProps {
  materials: LectureMaterial[];
  onUpload: (files: FileList) => void;
  onDownload: (material: LectureMaterial) => void;
  onDelete: (material: LectureMaterial) => void;
}

function LectureMaterialsTeacher({
  materials,
  onUpload,
  onDownload,
  onDelete,
}: LectureMaterialsTeacherProps) {
  return (
    <div className="relative w-130">
      <div className="flex flex-row items-center justify-between px-4 py-3 bg-white border border-black-200 rounded-t-[20px]">
        <div className="flex flex-row items-center gap-3">
          <WidgetIcon iconName="file" size={36} />
          <div className="flex flex-col gap-1">
            <span className="body-medium text-black-500">강의 자료</span>
            <span className="label-regular text-black-200">강의 자료 위젯</span>
          </div>
        </div>
        <IconButton iconName="more" className="hover:bg-black-50" />
      </div>

      <div className="flex flex-col gap-5 px-4 pt-4 pb-5 bg-black-0 border-x border-b border-black-200 rounded-b-[20px]">
        <UploadBlock hasFiles={materials.length > 0} onUpload={onUpload} />

        {materials.length > 0 && (
          <div className="flex flex-col gap-2 w-full">
            {materials.map((material) => (
              <MaterialBlock
                key={material.id}
                material={material}
                showDeleteButton
                onDownload={onDownload}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LectureMaterialsTeacher;
