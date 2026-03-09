import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/ui/icon/Icon';

type IconName = 'info' | 'note' | 'file' | 'quiz' | 'vote' | 'question';

const iconWidgetVariants = cva(
  'inline-flex items-center justify-center w-[30px] h-[30px] shrink-0 rounded-lg transition-colors',
  {
    variants: {
      iconName: {
        info: 'bg-widget-info',
        note: 'bg-widget-note',
        file: 'bg-widget-file',
        question: 'bg-widget-question',
        vote: 'bg-widget-vote',
        quiz: 'bg-widget-quiz',
      },
    },
    defaultVariants: {
      iconName: 'info',
    },
  },
);

interface WidgetIconProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconWidgetVariants> {
  iconName: IconName;
  size?: number;
}

function WidgetIcon({ iconName, className, size = 14 }: WidgetIconProps) {
  return (
    <div className={cn(iconWidgetVariants({ iconName }), className)}>
      <Icon
        name={iconName}
        size={size}
        className="w-auto h-auto max-w-[14px] max-h-[14px] object-contain"
      />
    </div>
  );
}

export default WidgetIcon;
