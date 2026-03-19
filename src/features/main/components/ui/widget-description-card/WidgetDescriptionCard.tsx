import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';

type IconName = 'info' | 'note' | 'file' | 'quiz' | 'vote' | 'question';

const cardVariants = cva(
  'flex flex-col w-[280px] p-6 pb-12 gap-4 bg-white rounded-2xl border-2 transition-all overflow-hidden text-left',
  {
    variants: {
      iconName: {
        info: '',
        note: '',
        file: '',
        question: '',
        vote: '',
        quiz: '',
      },
      isSelected: {
        false: 'border-black-50 shadow-sm',
        true: 'shadow-sm',
      },
    },
    compoundVariants: [
      /* Question */
      {
        isSelected: false,
        iconName: 'question',
        className: 'bg-widget-question-bg border-widget-question-border',
      },
      {
        isSelected: true,
        iconName: 'question',
        className:
          'bg-widget-question-bg-sel border-widget-question-border-sel',
      },

      /* Note */
      {
        isSelected: false,
        iconName: 'note',
        className: 'bg-widget-note-bg border-widget-note-border',
      },
      {
        isSelected: true,
        iconName: 'note',
        className: 'bg-widget-note-bg-sel border-widget-note-border-sel',
      },

      /* File */
      {
        isSelected: false,
        iconName: 'file',
        className: 'bg-widget-file-bg border-widget-file-border',
      },
      {
        isSelected: true,
        iconName: 'file',
        className: 'bg-widget-file-bg-sel border-widget-file-border-sel',
      },

      /* Quiz */
      {
        isSelected: false,
        iconName: 'quiz',
        className: 'bg-widget-quiz-bg border-widget-quiz-border',
      },
      {
        isSelected: true,
        iconName: 'quiz',
        className: 'bg-widget-quiz-bg-sel border-widget-quiz-border-sel',
      },

      /* Vote */
      {
        isSelected: false,
        iconName: 'vote',
        className: 'bg-widget-vote-bg border-widget-vote-border',
      },
      {
        isSelected: true,
        iconName: 'vote',
        className: 'bg-widget-vote-bg-sel border-widget-vote-border-sel',
      },
    ],
    defaultVariants: {
      iconName: 'info',
      isSelected: false,
    },
  },
);

interface WidgetDescriptionCardProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cardVariants> {
  iconName: IconName;
  title: string;
  description: string;
}

function WidgetDescriptionCard({
  iconName,
  title,
  description,
  isSelected = false,
  onClick,
  className,
  style,
  ...props
}: WidgetDescriptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(cardVariants({ iconName, isSelected }), 'cursor-pointer')}
      {...props}
    >
      <div className="flex items-center gap-2">
        <WidgetIcon iconName={iconName} size={30} />
        <span className="body-semibold text-black-500">{title}</span>
      </div>

      <div className="overflow-y-auto">
        <p className="description-regular text-black-300">{description}</p>
      </div>
    </button>
  );
}
export default WidgetDescriptionCard;
