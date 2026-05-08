import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Icon, { type IconName } from '@/shared/components/ui/icon/Icon';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer transition-colors',
  {
    variants: {
      shape: {
        square: 'rounded-lg',
        circle: 'rounded-full',
      },
      size: {
        small: 'h-6 hover:bg-black-50',
        medium: 'h-8 hover:bg-black-100',
      },
    },
    defaultVariants: {
      shape: 'square',
      size: 'medium',
    },
  },
);

const iconSizeMap: Record<
  NonNullable<VariantProps<typeof iconButtonVariants>['size']>,
  number
> = {
  small: 12,
  medium: 16,
};

const buttonWidthMap: Record<
  NonNullable<VariantProps<typeof iconButtonVariants>['size']>,
  string
> = {
  small: 'w-6',
  medium: 'w-8',
};

interface IconButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  iconName: IconName;
  label?: string;
  labelClassName?: string;
  iconClassName?: string;
}

function IconButton({
  shape,
  size = 'medium',
  iconName,
  label,
  className,
  labelClassName,
  iconClassName,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        iconButtonVariants({ shape, size }),
        label ? 'gap-1 px-2' : buttonWidthMap[size ?? 'medium'],
        className,
      )}
    >
      <Icon
        name={iconName}
        size={iconSizeMap[size ?? 'medium']}
        className={iconClassName}
      />
      {label && (
        <span className={cn('body-medium text-black-500', labelClassName)}>
          {label}
        </span>
      )}
    </button>
  );
}

export default IconButton;
