import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center bg-black-500 text-black-0',
  {
    variants: {
      size: {
        xs: 'px-3 py-2 description-medium',
        sm: 'px-3 py-2 description-medium',
        md: 'px-4 py-2 body-medium',
        lg: 'px-5 py-2 h3-semibold',
      },
      shape: {
        square: 'rounded-xl',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'square',
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

function Badge({ size, shape, className, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ size, shape }), className)}>
      {children}
    </span>
  );
}

export default Badge;
