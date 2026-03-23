import type { Meta, StoryObj } from '@storybook/react-vite';
import QuizTeacher from '../QuizTeacher';

const meta = {
  title: 'Feature/QuizTeacher',
  component: QuizTeacher,
  argTypes: {
    question: {
      control: 'text',
      description: '퀴즈 질문 텍스트',
    },
    choices: {
      control: 'object',
      description: '선택지 목록',
    },
    correctIndex: {
      control: 'number',
      description: '정답 선택지의 인덱스 (0부터 시작)',
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
    participantStatuses: {
      control: 'object',
      description: '선택지별 참여자 현황 목록',
    },
    onEnd: {
      action: 'ended',
      description: '퀴즈 종료 확인 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof QuizTeacher>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultChoices = ['파리', '런던', '베를린', '마드리드'];

const defaultParticipantStatuses = [
  { choiceIndex: 0, participants: ['김철수', '이영희', '박민준'] },
  { choiceIndex: 1, participants: ['최지수'] },
  { choiceIndex: 2, participants: ['정우진', '한소희'] },
  { choiceIndex: 3, participants: ['강동원'] },
];

export const Active: Story = {
  args: {
    question: '프랑스의 수도는 어디인가요?',
    choices: defaultChoices,
    correctIndex: 0,
    participantCount: 7,
    isEnded: false,
    participantStatuses: defaultParticipantStatuses,
    onEnd: () => {},
  },
};

export const Ended: Story = {
  args: {
    question: '프랑스의 수도는 어디인가요?',
    choices: defaultChoices,
    correctIndex: 0,
    participantCount: 7,
    isEnded: true,
    correctRate: 43,
    participantStatuses: defaultParticipantStatuses,
    onEnd: () => {},
  },
};

export const AllVariants: Story = {
  args: {
    question: '프랑스의 수도는 어디인가요?',
    choices: defaultChoices,
    correctIndex: 0,
    participantCount: 7,
    isEnded: false,
    participantStatuses: defaultParticipantStatuses,
    onEnd: () => {},
  },
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="body-medium text-black-500 mb-4">진행 중</p>
        <QuizTeacher
          question="프랑스의 수도는 어디인가요?"
          choices={defaultChoices}
          correctIndex={0}
          participantCount={7}
          isEnded={false}
          participantStatuses={defaultParticipantStatuses}
          onEnd={() => {}}
        />
      </div>
      <div>
        <p className="body-medium text-black-500 mb-4">종료 후 결과 표시</p>
        <QuizTeacher
          question="프랑스의 수도는 어디인가요?"
          choices={defaultChoices}
          correctIndex={0}
          participantCount={7}
          isEnded
          correctRate={43}
          participantStatuses={defaultParticipantStatuses}
          onEnd={() => {}}
        />
      </div>
    </div>
  ),
};
