import type { ReactNode } from 'react';

interface QuizFooterProps {
  statusSlot: ReactNode;
  actionSlot: ReactNode;
}

function QuizFooter({ statusSlot, actionSlot }: QuizFooterProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      {statusSlot}
      {actionSlot}
    </div>
  );
}

export default QuizFooter;
