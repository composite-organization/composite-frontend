import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const actionButtonVariants = cva(
  'flex items-center justify-center w-[52px] h-6 rounded-lg description-medium transition-colors',
  {
    variants: {
      variant: {
        edit: 'bg-black-0 text-black-500 hover:bg-black-100',
        delete: 'bg-black-0 text-[#FF0000] hover:bg-black-100',
      },
    },
    defaultVariants: {
      variant: 'edit',
    },
  },
);

interface ActionButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionButtonVariants> {
  children: React.ReactNode;
}

function ActionButton({
  variant,
  className,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(actionButtonVariants({ variant }), className)}
    >
      {children}
    </button>
  );
}

export default ActionButton;
