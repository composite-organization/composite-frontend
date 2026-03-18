import StatusButton from '@/shared/components/ui/status-button/StatusButton';
import Button from '@/shared/components/ui/button/Button';

interface FooterProps {
  onStatusClick?: () => void;
  onSubmitClick?: () => void;
  submitLabel?: string;
  isSubmitDisabled?: boolean;
}

function Footer({
  onStatusClick,
  onSubmitClick,
  submitLabel = '제출하기',
  isSubmitDisabled = false,
}: FooterProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full h-8">
      <StatusButton onClick={onStatusClick} />
      <Button
        variant="blue"
        size="xs"
        onClick={onSubmitClick}
        disabled={isSubmitDisabled}
        className="rounded-[14px]"
      >
        {submitLabel}
      </Button>
    </div>
  );
}

export default Footer;
