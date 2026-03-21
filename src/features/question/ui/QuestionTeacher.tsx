import { useState } from 'react';
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
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    userName: '홍길동',
    createAt: new Date('2026-03-21T14:30:00'),
    content: '교수님, 중간고사 범위는 어디까지인가요?',
    likeCount: 3,
    isCompleted: false,
    isLiked: false,
    userId: 'user123',
  },
  {
    id: '2',
    userName: '김철수',
    createAt: new Date('2026-03-22T09:00:00'),
    content: '지난 수업 때 말씀하신 참고도서 제목이 기억이 안 나요.',
    likeCount: 1,
    isCompleted: true,
    isLiked: true,
    userId: 'user456',
  },
];

function QuestionTeacher({
  widgetName = '질문',
  widgetDescription = '학생들이 남긴 질문을 확인하세요.',
  currentUserId = 'teacher',
}: QuestionTeacherProps) {
  const [questions] = useState<Question[]>(MOCK_QUESTIONS);
  const [currentPage, setCurrentPage] = useState(1);
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
                key={question.id}
                userName={question.userName}
                createAt={question.createAt}
                content={question.content}
                likeCount={question.likeCount}
                isCompleted={question.isCompleted}
                isLiked={question.isLiked}
                userId={question.userId}
                currentUserId={currentUserId}
                userRole="teacher"
              />
            ))}
            <div className="w-full pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default QuestionTeacher;
