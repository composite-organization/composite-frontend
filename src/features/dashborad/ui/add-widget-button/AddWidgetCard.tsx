import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';

type IconName = 'file' | 'note' | 'quiz' | 'vote' | 'question';

const addWidgetCardVariants = cva(
  'flex items-center gap-[10px] border-2 w-full w-min-100 p-4 rounded-[14px] bg-black-0 border-black-100',
  {
    variants: {
      widgetName: {
        question: '',
        quiz: '',
        file: '',
        note: '',
        vote: '',
      },
      isSelected: {
        true: '',
        false: 'bg-black-0 border-black-100',
      },
    },

    compoundVariants: [
      {
        widgetName: 'question',
        isSelected: true,
        className: 'bg-widget-question-bg border-widget-question-border',
      },
      {
        widgetName: 'quiz',
        isSelected: true,
        className: 'bg-widget-quiz-bg border-widget-quiz-border',
      },
      {
        widgetName: 'file',
        isSelected: true,
        className: 'bg-widget-file-bg border-widget-file-border',
      },
      {
        widgetName: 'note',
        isSelected: true,
        className: 'bg-widget-note-bg border-widget-note-border',
      },
      {
        widgetName: 'vote',
        isSelected: true,
        className: 'bg-widget-vote-bg border-widget-vote-border',
      },
    ],
    defaultVariants: {
      widgetName: 'file',
      isSelected: false,
    },
  },
);

interface AddWidgetCardProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof addWidgetCardVariants> {
  iconName: IconName;
  title: string;
  label: string;
  onClick?: () => void;
}

function AddWidgetCard({
  iconName,
  title,
  label,
  isSelected,
  onClick,
}: AddWidgetCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        addWidgetCardVariants({ widgetName: iconName, isSelected }),
        'cursor-pointer',
      )}
    >
      <WidgetIcon iconName={iconName} size={45} />
      <div className="flex flex-col gap-[10px] p-0 text-left">
        <h1 className="body-semibold text-black-500 ">{title}</h1>
        <h2 className="description-medium text-black-300">{label}</h2>
      </div>
    </button>
  );
}
export default AddWidgetCard;
