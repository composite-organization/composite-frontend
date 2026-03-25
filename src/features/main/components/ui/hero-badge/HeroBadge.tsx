import Badge from '@/shared/components/ui/badge/Badge';
import Icon from '@/shared/components/ui/icon/Icon';

type BadgeName = 'module' | 'PC' | 'chat';

interface HeroBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  badgeName: BadgeName;
  label: string;
}

function HeroBadge({ badgeName, label, ...props }: HeroBadgeProps) {
  return (
    <Badge
      size="md"
      shape="round"
      className="bg-black-0 border-1 border-black-200 gap-1 px-5 py-2.5"
      {...props}
    >
      <Icon name={badgeName} size={20} />
      <span className="text-black-500 body-regular">{label}</span>
    </Badge>
  );
}
export default HeroBadge;
