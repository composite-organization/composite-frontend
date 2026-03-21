import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface QuestionInputCardProps {
  onSubmit?: (content: string, isAnonymous: boolean) => void;
}

function QuestionInputCard({ onSubmit }: QuestionInputCardProps) {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleAnonymousButton = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleSubmit = () => {
    if (content.length <= 5) return;
    onSubmit?.(content, isAnonymous);
    setContent('');
  };

  return (
    <div className="flex flex-col w-122 px-3 py-3 rounded-2xl border-1 border-black-50 gap-3">
      <TextareaAutosize
        className="w-full resize-none border-none outline-none description-medium placeholder:text-black-300"
        placeholder="질문을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between p-0">
        <button
          type="button"
          onClick={handleAnonymousButton}
          className={cn(
            'flex items-center justify-between h-4 px-1.5 py-0.5 gap-1 rounded-md bg-black-100 caption-semibold text-black-300',
            isAnonymous ? 'bg-black-500 text-black-0' : '',
          )}
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
            'flex items-center h-5 px-[6px] py-1 gap-1 rounded-xl bg-black-100 caption-semibold text-black-0',
            content.length > 5 ? 'bg-blue-300' : '',
          )}
        >
          <img
            src="src/features/question/asset/send.svg"
            alt="send"
            width={12}
          />
          등록
        </button>
      </div>
    </div>
  );
}

export default QuestionInputCard;
