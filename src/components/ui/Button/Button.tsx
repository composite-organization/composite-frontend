import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  xs: 'px-4 py-2 label-medium rounded-[14px]',
  sm: 'px-4 py-[10px] label-medium rounded-[14px]',
  md: 'px-6 py-3 body-medium rounded-[20px]',
  lg: 'px-7 py-3 h3-semibold rounded-[20px]',
  xl: 'px-7 py-3 h2-semibold rounded-[20px]',
};

function Button({
  children,
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center cursor-pointer transition-colors duration-150',
        sizeStyles[size],
        disabled
          ? 'bg-black-200 text-black-100 cursor-not-allowed'
          : 'bg-black-500 text-black-0 hover:bg-black-400 active:bg-black-500',
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
