import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type WidgetName = 'note' | 'file' | 'quiz' | 'vote' | 'question';

const videoVariants = cva('rounded-xl border-3', {
  variants: {
    selectedId: {
      question: 'bg-widget-question-bg border-widget-question-border',
      quiz: 'bg-widget-quiz-bg border-widget-quiz-border',
      file: 'bg-widget-file-bg border-widget-file-border',
      note: 'bg-widget-note-bg border-widget-note-border',
      vote: 'bg-widget-vote-bg border-widget-vote-border',
    },
  },
  defaultVariants: {
    selectedId: 'question',
  },
});

interface VideoSectionProps extends VariantProps<typeof videoVariants> {
  selectedId: WidgetName;
  className?: string;
}

function VideoSection({ selectedId, className }: VideoSectionProps) {
  return (
    <div className={cn(videoVariants({ selectedId }), className)}>
      <div className="w-100 h-100" />
    </div>
  );
}
export default VideoSection;
