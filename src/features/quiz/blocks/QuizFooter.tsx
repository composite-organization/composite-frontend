import Icon from '@/shared/components/ui/icon/Icon';

interface QuizFooterProps {
  role: 'student' | 'teacher';
  participantCount: number;
  isEnded: boolean;
  onStatusClick: () => void;
  onActionClick: () => void;
}

function QuizFooter({
  role,
  participantCount,
  isEnded,
  onStatusClick,
  onActionClick,
}: QuizFooterProps) {
  const statusLabel =
    role === 'student' ? `${participantCount}명 참여` : '현황';
  const actionLabel = role === 'student' ? '제출' : '종료';

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <button
        type="button"
        onClick={onStatusClick}
        className="flex flex-row items-center gap-2 px-4 py-2 bg-black-50 rounded-[14px] label-regular text-black-500 cursor-pointer hover:bg-black-100 transition-colors"
      >
        <Icon name="PC" size={16} />
        <span>{statusLabel}</span>
      </button>
      <button
        type="button"
        onClick={isEnded ? undefined : onActionClick}
        disabled={isEnded}
        className="flex items-center justify-center px-5 py-[10px] rounded-[14px] label-medium text-black-0 transition-colors cursor-pointer disabled:bg-black-200 disabled:cursor-not-allowed bg-blue-300 hover:bg-blue-200"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export default QuizFooter;
