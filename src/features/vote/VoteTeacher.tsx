import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import OptionBadge from './blocks/OptionBadge';
import SelectionList, { type VoteSelectionItem } from './blocks/SelectionList';
import Footer from './blocks/Footer';

interface VoteTeacherProps {
  title: string;
  description: string;
  options: string[];
  selections: VoteSelectionItem[];
  onStatusClick?: () => void;
  onStopClick?: () => void;
}

function VoteTeacher({
  title,
  description,
  options,
  selections,
  onStatusClick,
  onStopClick,
}: VoteTeacherProps) {
  return (
    <div className="relative w-130">
      <div className="absolute top-0 left-0 w-full h-15 box-border flex flex-row justify-between items-center px-4 py-3 bg-white border border-black-200 rounded-[20px_20px_0_0]">
        <div className="flex flex-row items-center gap-3">
          <WidgetIcon iconName="vote" size={36} />
          <div className="flex flex-col gap-1">
            <span className="body-medium text-black-500">{title}</span>
            <span className="label-regular text-black-200">투표</span>
          </div>
        </div>
      </div>
      <div className="absolute top-15 left-0 w-full box-border flex flex-col gap-5 px-4 pt-4 pb-5 bg-black-0 border-[0_1px_1px_1px] border-black-200 rounded-[0_0_20px_20px]">
        <div className="flex flex-row items-center gap-2.5 w-full">
          <p className="flex-1 body-regular text-black-500">{description}</p>
          <OptionBadge options={options} />
        </div>
        <SelectionList variant="teacher" selections={selections} />
        <Footer
          onStatusClick={onStatusClick}
          onSubmitClick={onStopClick}
          submitLabel="종료하기"
        />
      </div>
    </div>
  );
}

export default VoteTeacher;
