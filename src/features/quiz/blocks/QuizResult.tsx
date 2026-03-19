interface QuizResultProps {
  correctRate: number;
  isStudent?: boolean;
  isCorrect?: boolean;
}

function QuizResult({ correctRate, isStudent, isCorrect }: QuizResultProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full border border-black-500 rounded-2xl p-6">
      <div className="flex flex-row items-center gap-[10px]">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full"
          style={{ backgroundColor: '#B3E6B6' }}
        >
          <div
            className="w-8 h-8 rounded-full border-2"
            style={{ borderColor: '#008C08' }}
          />
        </div>
        <div className="flex flex-col gap-5">
          <span className="desc-medium text-black-500">정답률</span>
          <span className="h2-semibold" style={{ color: '#008C08' }}>
            {correctRate}%
          </span>
        </div>
      </div>
      {isStudent && (
        <div className="flex flex-col items-end gap-[25px]">
          <span
            className={`desc-medium ${isCorrect ? 'text-blue-300' : 'text-black-500'}`}
          >
            {isCorrect ? '정답입니다!' : '오답입니다!'}
          </span>
          <span className="h2-semibold text-black-500">
            정답: {isCorrect ? '✓' : '✗'}
          </span>
        </div>
      )}
    </div>
  );
}

export default QuizResult;
