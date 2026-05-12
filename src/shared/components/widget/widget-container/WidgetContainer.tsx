import type { ReactNode } from 'react';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import type { WidgetName } from '@/shared/types/widget.type';

interface WidgetContainerBaseProps {
  iconName: WidgetName;
  title: string;
  description: string;
  width?: string;
  children: ReactNode;
  showMore?: boolean;
  onMoreClick?: () => void;
}

interface StudentWidgetContainerProps {
  iconName: WidgetName;
  title: string;
  description: string;
  width?: string;
  children: ReactNode;
}

interface TeacherWidgetContainerProps {
  iconName: WidgetName;
  title: string;
  description: string;
  width?: string;
  children: ReactNode;
  onMoreClick?: () => void;
}

function WidgetContainerBase({
  iconName,
  title,
  description,
  width = 'w-130',
  children,
  showMore = false,
  onMoreClick,
}: WidgetContainerBaseProps) {
  return (
    <div className={`flex flex-col ${width}`}>
      <div className="flex flex-row items-center justify-between px-4 py-3 bg-white border border-black-200 rounded-t-[20px]">
        <div className="flex flex-row items-center gap-3">
          <WidgetIcon iconName={iconName} size={36} />
          <div className="flex flex-col gap-1">
            <span className="body-medium text-black-500">{title}</span>
            <span className="label-regular text-black-200">{description}</span>
          </div>
        </div>
        {showMore && (
          <IconButton iconName="more" shape="square" onClick={onMoreClick} />
        )}
      </div>

      <div className="flex flex-col bg-black-0 border-x border-b border-black-200 rounded-b-[20px]">
        {children}
      </div>
    </div>
  );
}

export function StudentWidgetContainer(props: StudentWidgetContainerProps) {
  return <WidgetContainerBase {...props} />;
}

function WidgetContainer(props: TeacherWidgetContainerProps) {
  return <WidgetContainerBase {...props} showMore />;
}

export { WidgetContainer as TeacherWidgetContainer };
export default WidgetContainer;
