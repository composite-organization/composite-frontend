import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const selectionButtonVariants = cva(
  'flex items-center justify-center w-12 h-12 rounded-full border-2 border-black-200 body-semibold cursor-pointer transition-colors duration-150',
  {
    variants: {
      variant: {
        default:
          'bg-black-50 text-black-500 hover:bg-blue-200 hover:text-black-0',
        hover: 'bg-blue-200 text-black-0',
        selected: 'bg-blue-300 text-black-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface SelectionButtonProps extends VariantProps<
  typeof selectionButtonVariants
> {
  label: string;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

function SelectionButton({
  label,
  variant,
  onClick,
  ariaLabel = '선택 버튼',
  className,
}: SelectionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(selectionButtonVariants({ variant }), className)}
    >
      {label}
    </button>
  );
}

export default SelectionButton;
