import WidgetIcon from '@/shared/components/ui/widget-icon/WidgetIcon';
import IconButton from '@/shared/components/ui/icon-button/IconButton';

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
    <section
      className="flex flex-col w-130"
      aria-labelledby="teacher-question-title"
    >
      <div className="flex flex-row justify-between items-center px-4 py-3 h-[60px] bg-white border border-black-200 rounded-t-[20px]">
        <div className="flex flex-row items-center gap-3">
          <WidgetIcon iconName="question" size={36} />
          <div className="flex flex-col gap-1">
            <p
              id="teacher-question-title"
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
    </section>
  );
}

export default QuestionTeacher;
