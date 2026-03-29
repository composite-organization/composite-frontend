import type { Meta, StoryObj } from '@storybook/react';
import QuestionCard from '@/features/question/ui/blocks/QuestionCard';

const meta: Meta<typeof QuestionCard> = {
  title: 'QUESTION/QuestionCard',
  component: QuestionCard,
  tags: ['autodocs'],
  args: {
    currentUserId: 'user123',
    userRole: 'student',
    question: {
      id: '1',
      userName: '홍길동',
      createAt: new Date('2026-03-23T10:00:00'),
      content:
        '교수님, 이 부분 코드가 잘 이해가 안 가는데 다시 설명해 주실 수 있나요? \n 본인이 작성한 글입니다. 수정 및 삭제가 가능합니다.',
      likeCount: 5,
      isCompleted: false,
      isLiked: false,
      userId: 'user123',
    },
  },
  argTypes: {
    userRole: {
      control: 'radio',
      options: ['teacher', 'student'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Completed: Story = {
  args: {
    question: {
      id: '2',
      userName: '홍길동',
      createAt: new Date('2026-03-23T09:00:00'),
      content: '답변 완료 상태입니다.',
      likeCount: 2,
      isCompleted: true,
      isLiked: false,
      userId: 'user123',
    },
  },
};

export const TeacherView: Story = {
  args: {
    userRole: 'teacher',
    currentUserId: 'teacher_id',
    question: {
      id: '3',
      userName: '김철수',
      createAt: new Date('2026-03-23T11:00:00'),
      content: '과제 제출 기한이 언제까지인가요?',
      likeCount: 10,
      isCompleted: false,
      isLiked: true,
      userId: 'student_id',
    },
  },
};

export const OthersPost: Story = {
  args: {
    currentUserId: 'my_id',
    question: {
      id: '4',
      userName: '이영희',
      createAt: new Date('2026-03-23T12:00:00'),
      content: '이 문제는 스택으로 푸는 게 맞나요?',
      likeCount: 3,
      isCompleted: false,
      isLiked: false,
      userId: 'others_id',
    },
  },
};
