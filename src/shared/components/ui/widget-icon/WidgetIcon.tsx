import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/ui/icon/Icon';

type IconName = 'info' | 'note' | 'file' | 'quiz' | 'vote' | 'question';

const iconWidgetVariants = cva(
  'inline-flex items-center justify-center shrink-0 rounded-lg transition-colors hover:brightness-95',
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
    React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconWidgetVariants> {
  iconName: IconName;
  size?: number;
}

function WidgetIcon({ iconName, className, size = 30 }: WidgetIconProps) {
  const iconSize = size * (14 / 30);

  return (
    <div
      className={cn(iconWidgetVariants({ iconName }), className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Icon
        name={iconName}
        className="object-contain"
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      />
    </div>
  );
}

export default WidgetIcon;
