import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputWrapperVariants = cva(
  'flex w-full flex-row items-center rounded-xl border-2 px-5 py-4 gap-2.5 transition-colors',
  {
    variants: {
      state: {
        default: 'border-black-200 bg-transparent focus-within:border-blue-200',
        selected: 'border-blue-300 bg-transparent',
        disabled: 'border-black-100 bg-black-100',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

const inputInnerVariants = cva(
  'flex-1 min-w-0 bg-transparent outline-none body-medium placeholder:text-black-200',
  {
    variants: {
      state: {
        default: 'text-black-500',
        selected: 'text-black-500',
        disabled: 'text-black-300 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>,
    VariantProps<typeof inputWrapperVariants> {
  checkbox?: boolean;
  checkboxChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  title?: string;
  wrapperClassName?: string;
}

function Input({
  state = 'default',
  checkbox,
  checkboxChecked,
  onCheckboxChange,
  title,
  className,
  wrapperClassName,
  ...props
}: InputProps) {
  const isDisabled = state === 'disabled';

  const inputElement = (
    <div className={cn(inputWrapperVariants({ state }), wrapperClassName)}>
      <input
        type="text"
        {...props}
        disabled={isDisabled}
        className={cn(inputInnerVariants({ state }), className)}
      />
      {checkbox && (
        <input
          type="checkbox"
          checked={checkboxChecked}
          disabled={isDisabled}
          onChange={(e) => onCheckboxChange?.(e.target.checked)}
          className="flex-none w-4 h-4 cursor-pointer disabled:cursor-not-allowed accent-black-500"
        />
      )}
    </div>
  );

  if (title) {
    return (
      <div className="flex w-full flex-col gap-2">
        <span className="h3-semibold text-black-500">{title}</span>
        {inputElement}
      </div>
    );
  }

  return inputElement;
}

export default Input;
