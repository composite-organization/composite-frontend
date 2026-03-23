import Badge from '@/shared/components/ui/badge/Badge';

interface OptionBadgeProps {
  options: string[];
}

function OptionBadge({ options }: OptionBadgeProps) {
  return (
    <ul className="flex flex-row items-center gap-2">
      {options.map((option) => (
        <li key={option}>
          <Badge size="xs" shape="round" className="bg-black-50 text-black-500">
            {option}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

export default OptionBadge;
