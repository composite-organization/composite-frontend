import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Icon, { type IconName } from '@/shared/components/ui/icon/Icon';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center h-8 cursor-pointer transition-colors hover:bg-black-100 disabled:cursor-not-allowed disabled:hover:bg-transparent',
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
  iconSize?: number;
  label?: string;
  labelClassName?: string;
}

function IconButton({
  shape,
  iconName,
  iconSize = 16,
  label,
  className,
  labelClassName,
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
      <Icon name={iconName} size={iconSize} />
      {label && (
        <span className={cn('body-medium text-black-500', labelClassName)}>
          {label}
        </span>
      )}
    </button>
  );
}

export default IconButton;
