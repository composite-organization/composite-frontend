import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const numberButtonVariants = cva(
  'flex shrink-0 items-center justify-center w-12 h-12 rounded-full border-2 border-black-200 body-semibold transition-colors',
  {
    variants: {
      state: {
        default: 'bg-black-50 text-black-500',
        selected: 'bg-blue-200 text-black-0',
        correct: 'bg-blue-300 text-black-0',
        disabled: 'bg-black-50 text-black-500',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

const choiceBoxVariants = cva(
  'flex flex-1 items-center rounded-xl border-2 px-5 py-4 body-medium text-black-500 transition-colors',
  {
    variants: {
      state: {
        default: 'border-black-200',
        selected: 'border-blue-200',
        correct: 'border-blue-300',
        disabled: 'border-black-200',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

interface QuizSelectionProps extends VariantProps<typeof numberButtonVariants> {
  index: number;
  content: string;
  state: 'default' | 'selected' | 'correct' | 'disabled';
  onClick?: () => void;
}

function QuizSelection({ index, content, state, onClick }: QuizSelectionProps) {
  const isInteractive = state !== 'disabled';

  return (
    <button
      type="button"
      disabled={!isInteractive}
      onClick={onClick}
      className={cn(
        'flex w-full flex-row items-center gap-2 bg-transparent cursor-pointer disabled:cursor-not-allowed',
      )}
    >
      <div
        className={cn(numberButtonVariants({ state }), 'pointer-events-none')}
      >
        {index}
      </div>
      <div
        className={cn(
          choiceBoxVariants({ state }),
          'pointer-events-none text-left',
        )}
      >
        {content}
      </div>
    </button>
  );
}

export default QuizSelection;
