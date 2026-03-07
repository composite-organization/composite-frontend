import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/ui/icon/Icon';

type IconName =
  | 'add'
  | 'close'
  | 'copy'
  | 'delete'
  | 'download'
  | 'edit'
  | 'info'
  | 'link'
  | 'more'
  | 'pin'
  | 'upload';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center h-8 cursor-pointer transition-colors hover:bg-black-100',
  {
    variants: {
      shape: {
        square: 'rounded-lg',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      shape: 'square',
    },
  },
);

interface IconButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  iconName: IconName;
  label?: string;
}

function IconButton({
  shape,
  iconName,
  label,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        iconButtonVariants({ shape }),
        label ? 'gap-1 px-2' : 'w-8',
        className,
      )}
    >
      <Icon name={iconName} size={16} />
      {label && <span className="body-medium text-black-500">{label}</span>}
    </button>
  );
}

export default IconButton;
