import type { Meta, StoryObj } from '@storybook/react-vite';
import QuizCreate from '../QuizCreate';

const meta = {
  title: 'Feature/QuizCreate',
  component: QuizCreate,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림 여부',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 요청 시 호출되는 콜백',
    },
    onSubmit: {
      action: 'submitted',
      description:
        '퀴즈 생성 완료 시 호출되는 콜백 (질문, 정답 인덱스, 선택지 목록 전달)',
    },
  },
} satisfies Meta<typeof QuizCreate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onSubmit: () => {},
  },
};

export const AllVariants: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: () => (
    <div className="flex flex-col gap-5">
      <QuizCreate isOpen onClose={() => {}} onSubmit={() => {}} />
    </div>
  ),
};
