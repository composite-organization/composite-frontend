import type { Meta, StoryObj } from '@storybook/react-vite';
import { VoteCreate } from '..';

const meta: Meta<typeof VoteCreate> = {
  title: 'Feature/VoteCreate',
  component: VoteCreate,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          [role="button"][tabindex="0"].fixed {
            position: static !important;
            background: transparent !important;
          }
        `}</style>
        <Story />
      </>
    ),
  ],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림 여부',
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 또는 닫기 버튼 클릭 시 호출',
    },
    onSubmit: {
      action: 'submitted',
      description: '생성 버튼 클릭 시 호출 (제목, 설명, 선택지, 옵션 전달)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof VoteCreate>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};

export const AllVariants: Story = {
  render: () => <VoteCreate isOpen onCancel={() => {}} onSubmit={() => {}} />,
};
