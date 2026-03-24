import IconButton from '@/shared/components/ui/icon-button/IconButton';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import EmptyFileIllustration from './components/EmptyFileIllustration';
import MaterialBlock from './blocks/MaterialBlock';
import type { LectureMaterial } from '../types';

interface LectureMaterialsStudentProps {
  materials: LectureMaterial[];
  onDownload: (material: LectureMaterial) => void;
}

function LectureMaterialsStudent({
  materials,
  onDownload,
}: LectureMaterialsStudentProps) {
  return (
    <article className="relative w-130">
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

      <div className="flex flex-col items-center gap-5 px-4 pt-4 pb-5 bg-black-0 border-x border-b border-black-200 rounded-b-[20px]">
        {materials.length === 0 ? (
          <div className="flex flex-col items-center gap-2.5 py-2.5">
            <EmptyFileIllustration />
            <span className="body-medium text-black-200">
              공유된 강의자료가 없습니다
            </span>
          </div>
        ) : (
          <ul className="flex flex-col gap-2 w-full">
            {materials.map((material) => (
              <li key={material.id}>
                <MaterialBlock material={material} onDownload={onDownload} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default LectureMaterialsStudent;
