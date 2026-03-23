import { cn } from '@/lib/utils';

interface QuizResultProps {
  correctRate: number;
  correctAnswerIndex?: number;
  isStudent?: boolean;
  isCorrect?: boolean;
}

function QuizResult({
  correctRate,
  correctAnswerIndex,
  isStudent,
  isCorrect,
}: QuizResultProps) {
  return (
    <div
      className={cn(
        'flex flex-row items-center w-full border border-black-500 rounded-2xl p-6',
        isStudent ? 'justify-between' : 'justify-center',
      )}
    >
      {isStudent && (
        <div className="flex flex-col items-start gap-6.25">
          <span className="description-semibold">
            <span className={cn(isCorrect ? 'text-blue-300' : 'text-red-500')}>
              {isCorrect ? '정답' : '오답'}
            </span>
            입니다!
          </span>
          {correctAnswerIndex !== undefined && (
            <span className="h2-semibold text-black-500">
              정답: {correctAnswerIndex}번
            </span>
          )}
        </div>
      )}
      <div className="flex flex-row items-center gap-2.5">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full"
          style={{ backgroundColor: '#B3E6B6' }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7371 16.5676C25.5898 15.1838 26.0811 13.5544 26.0811 11.8108V4.45946M24.7371 16.5676C23.9243 17.8893 22.7864 18.9808 21.432 19.7378C20.0775 20.4948 18.5517 20.8921 17 20.8919M24.7371 16.5676H26.0811C27.9161 16.5676 29.6759 15.8386 30.9735 14.5411C32.271 13.2435 33 11.4837 33 9.64865V7.05405C33 6.36592 32.7266 5.70598 32.2401 5.2194C31.7535 4.73282 31.0935 4.45946 30.4054 4.45946H26.0811M26.0811 4.45946C26.0811 3.54195 25.7166 2.66203 25.0678 2.01325C24.4191 1.36448 23.5391 1 22.6216 1H11.3784C10.4609 1 9.58095 1.36448 8.93217 2.01325C8.2834 2.66203 7.91892 3.54195 7.91892 4.45946M17 20.8919C13.7291 20.8919 10.8612 19.1622 9.26292 16.5676M17 20.8919V26.9459M9.26292 16.5676H7.91892C6.08391 16.5676 4.32405 15.8386 3.0265 14.5411C1.72896 13.2435 1 11.4837 1 9.64865V7.05405C1 6.36592 1.27336 5.70598 1.75994 5.2194C2.24652 4.73282 2.90647 4.45946 3.59459 4.45946H7.91892M9.26292 16.5676C8.38203 15.1375 7.91665 13.4904 7.91892 11.8108V4.45946M8.78378 30.4054C8.78378 29.4879 9.14826 28.608 9.79704 27.9592C10.4458 27.3104 11.3257 26.9459 12.2432 26.9459H21.7568C22.6743 26.9459 23.5542 27.3104 24.203 27.9592C24.8517 28.608 25.2162 29.4879 25.2162 30.4054V31.2703C25.2162 31.729 25.034 32.169 24.7096 32.4934C24.3852 32.8178 23.9452 33 23.4865 33H10.5135C10.0548 33 9.6148 32.8178 9.29041 32.4934C8.96602 32.169 8.78378 31.729 8.78378 31.2703V30.4054Z"
              stroke="#008C08"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-5">
          <span className="description-medium text-black-500">정답률</span>
          <span className="h2-semibold" style={{ color: '#008C08' }}>
            {correctRate}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
