import ToggleButton from '@/shared/components/ui/toggle-button/ToggleButton';

export interface VoteOption {
  id: string;
  label: string;
  enabled: boolean;
}

interface OptionProps {
  options: VoteOption[];
  onToggle: (id: string, enabled: boolean) => void;
}

function Option({ options, onToggle }: OptionProps) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="h3-semibold text-black-500">설정</span>
      <ul className="flex flex-col gap-2.5 w-full">
        {options.map((option) => (
          <li
            key={option.id}
            className="flex flex-row justify-between items-center w-full h-4.5"
          >
            <span className="body-medium text-black-500">{option.label}</span>
            <ToggleButton
              checked={option.enabled}
              onChange={(nextEnabled) => onToggle(option.id, nextEnabled)}
              ariaLabel={option.label}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Option;
