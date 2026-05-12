import { cn } from '@/lib/utils';

interface MoreActionMenuProps {
  className?: string;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

interface ActionItemProps {
  iconName: 'edit' | 'delete';
  label: string;
  colorClassName: string;
  iconColor: string;
  onClick?: () => void;
}

function ActionIcon({
  iconName,
  iconColor,
}: Pick<ActionItemProps, 'iconName' | 'iconColor'>) {
  return (
    <span
      aria-hidden
      className="size-4 shrink-0"
      style={{
        backgroundColor: iconColor,
        mask: `url(/assets/icons/${iconName}.svg) center / contain no-repeat`,
        WebkitMask: `url(/assets/icons/${iconName}.svg) center / contain no-repeat`,
      }}
    />
  );
}

function ActionItem({
  iconName,
  label,
  colorClassName,
  iconColor,
  onClick,
}: ActionItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left label-medium transition-colors hover:bg-black-50',
        colorClassName,
      )}
      onClick={onClick}
    >
      <ActionIcon iconName={iconName} iconColor={iconColor} />
      <span>{label}</span>
    </button>
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
      <ActionItem
        iconName="edit"
        label="수정"
        colorClassName="text-black-500"
        iconColor="#1E1E1E"
        onClick={onEditClick}
      />
      <ActionItem
        iconName="delete"
        label="삭제"
        colorClassName="text-[#FF0000]"
        iconColor="#FF0000"
        onClick={onDeleteClick}
      />
    </div>
  );
}

export default MoreActionMenu;
