import { cn } from '@/lib/utils';
import ActionButton from '@/shared/components/ui/action-button/ActionButton';
import Icon, { type IconName } from '@/shared/components/ui/icon/Icon';

interface MoreActionMenuProps {
  className?: string;
  isEditDisabled?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

interface ActionItemProps {
  variant: 'edit' | 'delete';
  iconName: IconName;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

function ActionItem({
  variant,
  iconName,
  label,
  disabled = false,
  onClick,
}: ActionItemProps) {
  return (
    <ActionButton
      variant={variant}
      className="h-9 w-full justify-start gap-2 px-3 label-medium hover:bg-black-50 disabled:cursor-not-allowed disabled:text-black-200 disabled:hover:bg-black-0"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={iconName} size={16} decorative className="size-4 shrink-0" />
      <span>{label}</span>
    </ActionButton>
  );
}

function MoreActionMenu({
  className,
  isEditDisabled = false,
  onEditClick,
  onDeleteClick,
}: MoreActionMenuProps) {
  return (
    <div
      className={cn(
        'absolute right-0 top-full z-20 mt-2 flex w-24 flex-col gap-1 rounded-xl border border-black-100 bg-white p-1 shadow-md',
        className,
      )}
      role="menu"
    >
      <ActionItem
        variant="edit"
        iconName="edit"
        label="수정"
        onClick={onEditClick}
        disabled={isEditDisabled || !onEditClick}
      />
      <ActionItem
        variant="delete"
        iconName="delete"
        label="삭제"
        onClick={onDeleteClick}
      />
    </div>
  );
}

export default MoreActionMenu;
