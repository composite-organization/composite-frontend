import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Icon, { type IconName } from '@/shared/components/ui/icon/Icon';

const selectableButtonVariants = cva(
  'inline-flex items-center justify-center transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        like: 'bg-black-100 text-black-500',
      },
      size: {
        xxs: 'h-4 px-2 gap-0.5 rounded-3xl caption-regular',
        xs: 'h-6 px-3 gap-1 rounded-lg label-medium',
        sm: 'h-8 px-4 gap-1.5 rounded-xl body-medium',
      },
      isSelected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'like',
        isSelected: true,
        className: 'bg-widget-question-bg-sel text-blue-300',
      },
    ],
    defaultVariants: {
      variant: 'like',
      size: 'xxs',
      isSelected: false,
    },
  },
);

export interface SelectableButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof selectableButtonVariants> {
  iconName?: IconName;
  selectedIconName?: IconName;
  iconSize?: number;
  label?: string | number;
  disabled?: boolean;
}

function SelectableButton({
  variant,
  size,
  isSelected,
  iconName,
  selectedIconName,
  iconSize = 12,
  label,
  className,
  disabled,
  ...props
}: SelectableButtonProps) {
  const currentIconName =
    isSelected && selectedIconName ? selectedIconName : iconName;

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        selectableButtonVariants({ variant, size, isSelected }),
        className,
      )}
      {...props}
    >
      {currentIconName && (
        <Icon
          name={currentIconName}
          size={iconSize}
          alt={String(label || 'icon')}
        />
      )}
      {label !== undefined && <span>{label}</span>}
    </button>
  );
}

export default SelectableButton;
