import { cva, type VariantProps } from 'class-variance-authority';

const THUMB_TRANSLATE_ON = 16;
const THUMB_TRANSLATE_OFF = 2;

const toggleTrackVariants = cva(
  'relative inline-flex w-8 h-[18px] rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2',
  {
    variants: {
      checked: {
        true: 'bg-blue-300 hover:bg-blue-200',
        false: 'bg-black-200 hover:bg-black-100',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  },
);

const toggleThumbClassName =
  'absolute top-[2px] h-[14px] w-[14px] rounded-full bg-black-0 shadow-sm transition-transform duration-200';

interface ToggleButtonProps extends Omit<
  VariantProps<typeof toggleTrackVariants>,
  'checked' | 'disabled'
> {
  checked: boolean;
  onChange?: (nextChecked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

function ToggleButton({
  checked,
  onChange,
  disabled = false,
  ariaLabel = '토글',
}: ToggleButtonProps) {
  function handleClick() {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={toggleTrackVariants({ checked, disabled })}
    >
      <span
        className={toggleThumbClassName}
        style={{
          transform: `translateX(${checked ? THUMB_TRANSLATE_ON : THUMB_TRANSLATE_OFF}px)`,
        }}
      />
    </button>
  );
}

export default ToggleButton;
