import { cn } from '@/lib/utils';

interface SelectionAddButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

function SelectionAddButton({
  onClick,
  disabled = false,
  ariaLabel = '항목 추가',
  className,
}: SelectionAddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'flex flex-row items-center justify-center cursor-pointer',
        'w-28.5 h-12 py-3 px-7 gap-2.5',
        'rounded-[20px]',
        'bg-black-50',
        'hover:bg-black-200',
        'disabled:bg-black-50 disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors',
        className,
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line
          x1="8"
          y1="1"
          x2="8"
          y2="15"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="1"
          y1="8"
          x2="15"
          y2="8"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="body-semibold text-black-500">추가</span>
    </button>
  );
}

export default SelectionAddButton;
