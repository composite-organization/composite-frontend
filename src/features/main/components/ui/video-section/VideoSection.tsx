import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type SelectedId = 'note' | 'file' | 'quiz' | 'vote' | 'question';

interface VideoSectionProps extends VariantProps<typeof videoVariants> {
  selectedId: SelectedId;
}
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
// const VIDEO_SOURCES: Record<string, string> = {
//   question: '/videos/question.mp4',
//   quiz: '/videos/quiz.mp4',
//   file: '/videos/file.mp4',
//   note: '/videos/note.mp4',
//   vote: '/videos/vote.mp4',
// };

function VideoSection({ selectedId }: VideoSectionProps) {
  return (
    <div
      className={cn(videoVariants({ selectedId }))}
      style={{ width: '878px', height: '620px' }}
    />
  );
}
export default VideoSection;
