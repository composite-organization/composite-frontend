import { cn } from '@/lib/utils';

interface SelectionDeleteButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

function SelectionDeleteButton({
  onClick,
  disabled,
  className,
}: SelectionDeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="삭제"
      className={cn(
        'flex items-center justify-center',
        'w-9 h-12 rounded-[20px]',
        'bg-black-0 text-black-500',
        'hover:bg-[#FF0000] hover:text-black-0',
        'disabled:bg-black-50 disabled:text-black-200 disabled:cursor-not-allowed',
        'transition-colors',
        className,
      )}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line
          x1="1"
          y1="1"
          x2="11"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="11"
          y1="1"
          x2="1"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default SelectionDeleteButton;
