import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  entryCode: string;
  dashboardUrl: string;
  participantCount: number;
}

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4.5"
        y="4.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="1.5"
        y="1.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="white"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 3H13V6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 3L7 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 4H3.5C2.95 4 2.5 4.45 2.5 5V12.5C2.5 13.05 2.95 13.5 3.5 13.5H11C11.55 13.5 12 13.05 12 12.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.5 13.5C2.5 11.015 5.015 9 8 9C10.985 9 13.5 11.015 13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const pillButtonClass = cn(
  'flex flex-row items-center justify-center gap-[10px]',
  'px-4 py-2',
  'bg-black-0 rounded-[14px]',
  'label-medium text-black-500',
  'cursor-pointer',
  'hover:bg-black-100',
  'transition-colors',
);

function DashboardHeader({
  entryCode,
  dashboardUrl,
  participantCount,
}: DashboardHeaderProps) {
  function handleDashboardLinkClick() {
    window.open(dashboardUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <header className="flex flex-row items-center justify-between w-full bg-blue-300 px-[120px] py-6">
      <span className="text-black-0 font-semibold text-[30px] leading-[36px]">
        Composite
      </span>
      <div className="flex flex-row items-center gap-[10px]">
        <button type="button" className={pillButtonClass}>
          <span>{entryCode}</span>
          <CopyIcon />
        </button>
        <button
          type="button"
          className={pillButtonClass}
          onClick={handleDashboardLinkClick}
        >
          <span>link</span>
          <LinkIcon />
        </button>
        <button type="button" className={pillButtonClass}>
          <span>{participantCount}</span>
          <PersonIcon />
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
