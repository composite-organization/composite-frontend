import { cn } from '@/lib/utils';
import ActionButton from '@/shared/components/ui/action-button/ActionButton';
import Icon, { type IconName } from '@/shared/components/ui/icon/Icon';

interface MoreActionMenuProps {
  className?: string;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

interface ActionItemProps {
  variant: 'edit' | 'delete';
  iconName: IconName;
  label: string;
  onClick?: () => void;
}

function ActionItem({ variant, iconName, label, onClick }: ActionItemProps) {
  return (
    <ActionButton
      variant={variant}
      className="h-9 w-full justify-start gap-2 px-3 label-medium hover:bg-black-50"
      onClick={onClick}
    >
      <Icon name={iconName} size={16} decorative className="size-4 shrink-0" />
      <span>{label}</span>
    </ActionButton>
  );
}

function MoreActionMenu({
  className,
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
      {onEditClick && (
        <ActionItem
          variant="edit"
          iconName="edit"
          label="수정"
          onClick={onEditClick}
        />
      )}
      {onDeleteClick && (
        <ActionItem
          variant="delete"
          iconName="delete"
          label="삭제"
          onClick={onDeleteClick}
        />
      )}
    </div>
  );
}

export default MoreActionMenu;
