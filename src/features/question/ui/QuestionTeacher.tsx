import { TeacherWidgetContainer } from '@/shared/components/widget/widget-container/WidgetContainer';
import QuestionCard from './blocks/QuestionCard';
import Pagination from './blocks/Pagination';

interface Question {
  id: string;
  userName: string;
  createAt: Date;
  content: string;
  likeCount: number;
  isCompleted: boolean;
  isLiked: boolean;
  userId: string;
}

interface QuestionTeacherProps {
  widgetName?: string;
  widgetDescription?: string;
  currentUserId?: string;
  questions: Question[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

function QuestionTeacher({
  widgetName = '질문',
  widgetDescription = '학생들이 남긴 질문을 확인하세요.',
  currentUserId = 'teacher',
  questions,
  currentPage,
  onPageChange,
}: QuestionTeacherProps) {
  const itemsPerPage = 5;
  const totalPages = Math.ceil((questions?.length ?? 0) / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuestions =
    questions?.slice(startIndex, startIndex + itemsPerPage) ?? [];

  return (
    <TeacherWidgetContainer
      iconName="question"
      title={widgetName}
      description={widgetDescription}
      width="w-[520px]"
    >
      <div className="flex flex-col items-start px-4 pt-4 pb-5 gap-2">
        {questions.length === 0 ? (
          <p className="w-full text-center py-4 body-regular text-black-200">
            등록된 질문이 없습니다
          </p>
        ) : (
          <div className="w-full flex flex-col gap-2" aria-label="질문 목록">
            {currentQuestions.map((question) => (
              <QuestionCard
                question={question}
                currentUserId={currentUserId}
                userRole="teacher"
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
    </TeacherWidgetContainer>
  );
}

export default QuestionTeacher;
