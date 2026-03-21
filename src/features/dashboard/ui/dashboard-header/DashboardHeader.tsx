import Button from '@/shared/components/ui/button/Button';

interface DashBoardHeaderProps {
  lessonName: string;
  teacherName: string;
  onOpenModal: () => void;
}

function DashboardHeader({
  lessonName,
  teacherName,
  onOpenModal,
}: DashBoardHeaderProps) {
  return (
    <header className="flex justify-between w-full min-w-[1600px] px-30 pt-8 pb-4">
      <div className="flex items-end gap-4">
        <h2 className="h2-semibold text-black-500">{lessonName}</h2>
        <p className="body-medium text-black-500">{teacherName}</p>
      </div>
      <Button variant="blue" size="md" onClick={onOpenModal}>
        + 위젯 추가
      </Button>
    </header>
  );
}
export default DashboardHeader;
