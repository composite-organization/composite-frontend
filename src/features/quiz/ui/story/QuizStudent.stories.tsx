import type { Meta, StoryObj } from '@storybook/react-vite';
import QuizStudent from '../QuizStudent';

const meta = {
  title: 'Feature/QuizStudent',
  component: QuizStudent,
  argTypes: {
    question: {
      control: 'text',
      description: '퀴즈 질문 텍스트',
    },
    choices: {
      control: 'object',
      description: '선택지 목록',
    },
    participantCount: {
      control: 'number',
      description: '현재 참여 인원 수',
    },
    isEnded: {
      control: 'boolean',
      description: '퀴즈 종료 여부',
    },
    correctRate: {
      control: 'number',
      description: '정답률 (0~100, isEnded가 true일 때 표시)',
    },
    isCorrect: {
      control: 'boolean',
      description: '학생의 정답 여부 (isEnded가 true일 때 표시)',
    },
    onSubmit: {
      action: 'submitted',
      description: '제출 버튼 클릭 시 호출되는 콜백 (선택한 인덱스 전달)',
    },
  },
} satisfies Meta<typeof QuizStudent>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultChoices = ['파리', '런던', '베를린', '마드리드'];

export const Active: Story = {
  args: {
    question: '프랑스의 수도는 어디인가요?',
    choices: defaultChoices,
    participantCount: 12,
    isEnded: false,
    onSubmit: () => {},
  },
};

export const Ended: Story = {
  args: {
    question: '프랑스의 수도는 어디인가요?',
    choices: defaultChoices,
    participantCount: 24,
    isEnded: true,
    correctRate: 75,
    correctAnswerIndex: 1,
    isCorrect: true,
    onSubmit: () => {},
  },
};

export const EndedWrong: Story = {
  args: {
    question: '프랑스의 수도는 어디인가요?',
    choices: defaultChoices,
    participantCount: 24,
    isEnded: true,
    correctRate: 75,
    correctAnswerIndex: 1,
    isCorrect: false,
    onSubmit: () => {},
  },
};

export const AllVariants: Story = {
  args: {
    question: '프랑스의 수도는 어디인가요?',
    choices: defaultChoices,
    participantCount: 12,
    isEnded: false,
    onSubmit: () => {},
  },
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="body-medium text-black-500 mb-4">진행 중</p>
        <QuizStudent
          question="프랑스의 수도는 어디인가요?"
          choices={defaultChoices}
          correctAnswerIndex={1}
          participantCount={12}
          isEnded={false}
          onSubmit={() => {}}
        />
      </div>
      <div>
        <p className="body-medium text-black-500 mb-4">종료 - 정답</p>
        <QuizStudent
          question="프랑스의 수도는 어디인가요?"
          choices={defaultChoices}
          participantCount={24}
          correctAnswerIndex={1}
          isEnded
          correctRate={75}
          isCorrect
          onSubmit={() => {}}
        />
      </div>
      <div>
        <p className="body-medium text-black-500 mb-4">종료 - 오답</p>
        <QuizStudent
          question="프랑스의 수도는 어디인가요?"
          choices={defaultChoices}
          participantCount={24}
          correctAnswerIndex={1}
          isEnded
          correctRate={75}
          isCorrect={false}
          onSubmit={() => {}}
        />
      </div>
    </div>
  ),
};
