import { cn } from '@/lib/utils';

interface SectionDividerProps {
  text: string;
  size?: number;
  className?: string;
}

function SectionDivider({ text, size = 300, className }: SectionDividerProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-4 w-full', className)}
    >
      <div className="bg-black-500" style={{ height: '1px', width: size }} />
      <h3 className="h3-semibold">{text}</h3>
      <div className="bg-black-500" style={{ height: '1px', width: size }} />
    </div>
  );
}

export default SectionDivider;
