import type { Meta, StoryObj } from '@storybook/react';
import QuestionCard from '@/features/question/ui/blocks/QuestionCard';

const meta: Meta<typeof QuestionCard> = {
  title: 'QUESTION/QuestionCard',
  component: QuestionCard,
  tags: ['autodocs'],
  args: {
    userName: '홍길동',
    createAt: new Date('2026-03-21T14:30:00'),
    content:
      '교수님, 중간고사 범위는 어디까지인가요? 전범위인가요 아니면 특정 챕터인가요?',
    likeCount: 3,
    isCompleted: false,
    isLiked: false,
    userId: 'user123',
    currentUserId: 'user123',
    userRole: 'student',
  },
  argTypes: {
    userRole: {
      control: 'radio',
      options: ['teacher', 'student'],
    },
    isCompleted: {
      control: 'boolean',
    },
    isLiked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isCompleted: false,
  },
};

export const Completed: Story = {
  args: {
    isCompleted: true,
  },
};

export const TeacherView: Story = {
  args: {
    userRole: 'teacher',
    currentUserId: 'teacher123',
    userId: 'student123',
  },
};

export const OthersPost: Story = {
  args: {
    currentUserId: 'myId',
    userId: 'othersId',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <div>내 질문 (학생)</div>
      <QuestionCard
        userName="홍길동"
        createAt={new Date()}
        content="내가 작성한 질문입니다. 수정/삭제 메뉴가 보여야 합니다."
        likeCount={5}
        isCompleted={false}
        isLiked={false}
        userId="me"
        currentUserId="me"
        userRole="student"
      />

      <div>다른 학생의 질문</div>
      <QuestionCard
        userName="김철수"
        createAt={new Date()}
        content="다른 학생이 작성한 질문입니다. 메뉴가 보이지 않아야 합니다."
        likeCount={12}
        isCompleted={false}
        isLiked
        userId="other"
        currentUserId="me"
        userRole="student"
      />

      <div>교수님 시점</div>
      <QuestionCard
        userName="이영희"
        createAt={new Date()}
        content="교수님이 보는 학생의 질문입니다. 완료/삭제 메뉴가 보여야 합니다."
        likeCount={8}
        isCompleted={false}
        isLiked={false}
        userId="student"
        currentUserId="teacher"
        userRole="teacher"
      />

      <div>완료된 질문</div>
      <QuestionCard
        userName="박지성"
        createAt={new Date()}
        content="이미 답변이 완료된 질문입니다. 배경색이 변하고 좋아요가 비활성화됩니다."
        likeCount={20}
        isCompleted
        isLiked={false}
        userId="student"
        currentUserId="teacher"
        userRole="teacher"
      />
    </div>
  ),
};
