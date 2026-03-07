import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full cursor-pointer transition-colors duration-150 disabled:bg-black-50 disabled:text-black-100 disabled:cursor-not-allowed disabled:border-none',
  {
    variants: {
      variant: {
        cancel:
          'bg-black-0 border-2 border-black-500 text-black-500 hover:bg-black-100',
        submit: 'bg-black-500 text-black-0 hover:bg-black-400',
        blue: 'bg-blue-300 text-black-0 hover:bg-blue-200',
        danger: 'bg-[#FF0000] text-black-0 hover:bg-[#FFD5D5]',
      },
      size: {
        xs: 'px-4 py-2 label-medium',
        sm: 'px-4 py-[10px] label-medium',
        md: 'px-6 py-3 body-medium',
        lg: 'px-7 py-4 h3-semibold',
        xl: 'px-[84px] py-5 h3-semibold',
      },
    },
    defaultVariants: {
      variant: 'submit',
      size: 'xl',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}

export default Button;
