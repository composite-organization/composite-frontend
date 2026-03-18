import Badge from '@/shared/components/ui/badge/Badge';

interface OptionBadgeProps {
  options: string[];
}

function OptionBadge({ options }: OptionBadgeProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      {options.map((option) => (
        <Badge
          key={option}
          size="xs"
          shape="round"
          className="bg-black-50 text-black-500"
        >
          {option}
        </Badge>
      ))}
    </div>
  );
}

export default OptionBadge;
