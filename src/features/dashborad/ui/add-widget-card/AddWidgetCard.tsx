import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';

type IconName = 'file' | 'note' | 'quiz' | 'vote' | 'question';

const addWidgetCardVariants = cva(
  'flex items-center gap-[10px] border-2 w-full w-min-100 p-4 rounded-[14px] bg-black-0 border-black-100 transition-all duration-200 cursor-pointer',
  {
    variants: {
      widgetName: {
        question:
          'hover:bg-widget-question-bg hover:border-widget-question-border',
        quiz: 'hover:bg-widget-quiz-bg hover:border-widget-quiz-border',
        file: 'hover:bg-widget-file-bg hover:border-widget-file-border',
        note: 'hover:bg-widget-note-bg hover:border-widget-note-border',
        vote: 'hover:bg-widget-vote-bg hover:border-widget-vote-border',
      },
    },
    defaultVariants: {
      widgetName: 'file',
    },
  },
);

interface AddWidgetCardProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof addWidgetCardVariants> {
  widgetName: IconName;
  title: string;
  label: string;
  onClick?: () => void;
}

function AddWidgetCard({
  widgetName,
  title,
  label,
  onClick,
}: AddWidgetCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(addWidgetCardVariants({ widgetName }))}
    >
      <WidgetIcon iconName={widgetName} size={45} />
      <div className="flex flex-col gap-[10px] p-0 text-left">
        <strong className="body-semibold text-black-500 ">{title}</strong>
        <p className="description-medium text-black-300">{label}</p>
      </div>
    </button>
  );
}
export default AddWidgetCard;
