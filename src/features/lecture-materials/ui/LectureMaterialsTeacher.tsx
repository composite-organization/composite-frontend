import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
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
    <TeacherWidgetContainer
      iconName="file"
      title="강의 자료"
      description="강의 자료 위젯"
    >
      <div className="flex flex-col gap-5 px-4 pt-4 pb-5">
        <UploadBlock hasFiles={materials.length > 0} onUpload={onUpload} />

        {materials.length > 0 && (
          <ul className="flex flex-col gap-2 w-full">
            {materials.map((material) => (
              <li key={material.id}>
                <MaterialBlock
                  material={material}
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

export default LectureMaterialsTeacher;
