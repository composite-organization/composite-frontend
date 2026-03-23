import React, { useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputWrapperVariants = cva(
  'flex w-full flex-row items-center transition-colors',
  {
    variants: {
      variant: {
        default: 'rounded-xl border-2 px-5 py-4 gap-2.5',
        bare: '',
      },
      state: {
        default: 'border-black-200 bg-transparent focus-within:border-blue-200',
        selected: 'border-blue-300 bg-transparent',
        disabled: 'border-black-100 bg-black-100',
      },
    },
    compoundVariants: [
      { variant: 'bare', state: 'default', className: 'border-none' },
      { variant: 'bare', state: 'selected', className: 'border-none' },
      {
        variant: 'bare',
        state: 'disabled',
        className: 'border-none bg-transparent',
      },
    ],
    defaultVariants: {
      variant: 'default',
      state: 'default',
    },
  },
);

const inputInnerVariants = cva(
  'flex-1 min-w-0 bg-transparent outline-none placeholder:text-black-200',
  {
    variants: {
      variant: {
        default: 'body-medium',
        bare: '',
      },
      state: {
        default: 'text-black-500',
        selected: 'text-black-500',
        disabled: 'text-black-300 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
    },
  },
);

interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>,
    VariantProps<typeof inputWrapperVariants> {
  multiline?: boolean;
  rows?: number;
  checkbox?: boolean;
  checkboxChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  title?: string;
  wrapperClassName?: string;
}

function Input({
  variant = 'default',
  state = 'default',
  multiline = false,
  rows,
  checkbox,
  checkboxChecked,
  onCheckboxChange,
  title,
  className,
  wrapperClassName,
  value,
  onChange,
  placeholder,
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = idProp ?? (title ? generatedId : undefined);
  const isDisabled = state === 'disabled';

  const innerClassName = cn(inputInnerVariants({ variant, state }), className);

  const inputElement = (
    <div
      className={cn(
        inputWrapperVariants({ variant, state }),
        multiline && 'items-start',
        wrapperClassName,
      )}
    >
      {multiline ? (
        <textarea
          id={inputId}
          value={value as string | undefined}
          onChange={
            onChange as
              | React.ChangeEventHandler<HTMLTextAreaElement>
              | undefined
          }
          placeholder={placeholder}
          disabled={isDisabled}
          rows={rows}
          className={cn(innerClassName, 'resize-none')}
        />
      ) : (
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
          disabled={isDisabled}
          className={innerClassName}
        />
      )}
      {!multiline && checkbox && (
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
        <label htmlFor={inputId} className="h3-semibold text-black-500">
          {title}
        </label>
        {inputElement}
      </div>
    );
  }

  return inputElement;
}

export default Input;
