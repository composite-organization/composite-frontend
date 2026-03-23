import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface QuestionInputCardProps {
  onSubmit?: (content: string, isAnonymous: boolean) => void;
}

function QuestionInputCard({ onSubmit }: QuestionInputCardProps) {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  const handleAnonymousButton = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleSubmit = () => {
    if (content.length <= 5) return;
    onSubmit?.(content, isAnonymous);
    setContent('');
  };

  return (
    <section
      className="flex flex-col w-122 px-3 py-3 rounded-2xl border-1 border-black-50 gap-3"
      aria-label="질문 작성"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        className="w-full resize-none border-none outline-none description-medium placeholder:text-black-300 max-h-25 overflow-y-auto"
        placeholder="질문을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="질문 내용 입력"
      />
      <div className="flex items-center justify-between p-0">
        <button
          type="button"
          onClick={handleAnonymousButton}
          className={cn(
            'flex items-center justify-between h-4 px-1.5 py-0.5 gap-1 rounded-md bg-black-100 caption-semibold text-black-300',
            isAnonymous ? 'bg-black-500 text-black-0' : '',
          )}
          aria-label={isAnonymous ? '실명으로 전환' : '익명으로 전환'}
        >
          <img
            src={`src/features/question/asset/${isAnonymous ? 'person-cross' : 'person-check'}.svg`}
            alt="person"
            width={12}
          />
          {isAnonymous ? '익명' : '실명'}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={cn(
            'flex items-center h-5 px-1.5 py-1 gap-1 rounded-xl bg-black-100 caption-semibold text-black-0',
            content.length > 5 ? 'bg-blue-300' : '',
          )}
          disabled={content.length <= 5}
          aria-label="질문 등록"
        >
          <img
            src="src/features/question/asset/send.svg"
            alt="send"
            width={12}
          />
          등록
        </button>
      </div>
    </section>
  );
}

export default QuestionInputCard;
