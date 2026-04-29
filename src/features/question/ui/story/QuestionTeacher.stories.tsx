import type { Meta, StoryObj } from '@storybook/react';
import QuestionTeacher from '../QuestionTeacher';
import type { Question } from '../../types';

const meta: Meta<typeof QuestionTeacher> = {
  title: 'QUESTION/QuestionTeacher',
  component: QuestionTeacher,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuestions: Question[] = [
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

export const Default: Story = {
  args: {
    questions: mockQuestions,
    currentPage: 1,
    onPageChange: () => {},
  },
};

export const Empty: Story = {
  args: {
    questions: [],
    currentPage: 1,
    onPageChange: () => {},
  },
};
