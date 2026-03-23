import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import QuestionInputCard from './blocks/QuestionInputCard';
import QuestionCard from './blocks/QuestionCard';
import Pagination from './blocks/Pagination';
import { getPaginatedData } from '../util/pagination';
import type { Question } from '../types';

interface QuestionStudentProps {
  widgetName?: string;
  widgetDescription?: string;
  currentUserId?: string;
  questions: Question[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onSubmitQuestion: (content: string, isAnonymous: boolean) => void;
}

function QuestionStudent({
  widgetName = '질문',
  widgetDescription = '자유롭게 질문을 남겨주세요.',
  currentUserId = 'me',
  questions,
  currentPage,
  onPageChange,
  onSubmitQuestion,
}: QuestionStudentProps) {
  const { currentItems: currentQuestions, totalPages } = getPaginatedData(
    questions,
    currentPage,
  );

  return (
    <section
      className="flex flex-col w-130"
      aria-labelledby="question-widget-title"
    >
      <div className="flex flex-row justify-between items-center px-4 py-3 h-[60px] bg-white border border-black-200 rounded-t-[20px]">
        <div className="flex flex-row items-center gap-3">
          <WidgetIcon iconName="question" size={36} />
          <div className="flex flex-col gap-1">
            <p
              id="question-widget-title"
              className="body-medium text-black-500"
            >
              {widgetName}
            </p>
            <p className="label-regular text-black-200">{widgetDescription}</p>
          </div>
        </div>
        <IconButton iconName="more" shape="square" aria-label="메뉴 열기" />
      </div>
      <div className="flex flex-col items-start px-4 pt-4 pb-5 gap-2 bg-black-0 border-x border-b border-black-200 rounded-b-[20px] w-[520px]">
        <QuestionInputCard onSubmit={onSubmitQuestion} />
        <div className="w-full flex flex-col gap-2" aria-label="질문 목록">
          {questions.length === 0 ? (
            <p className="w-full text-center py-4 body-regular text-black-200">
              질문이 등록되지 않았습니다
            </p>
          ) : (
            <div className="w-full flex flex-col gap-2" aria-label="질문 목록">
              {currentQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  currentUserId={currentUserId}
                  userRole="student"
                />
              ))}
              <div className="w-full pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default QuestionStudent;
