import { StudentWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
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
    <StudentWidgetContainer
      iconName="question"
      title={widgetName}
      description={widgetDescription}
      width="w-[520px]"
    >
      <div className="flex flex-col items-start px-4 pt-4 pb-5 gap-2">
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
    </StudentWidgetContainer>
  );
}

export default QuestionStudent;
