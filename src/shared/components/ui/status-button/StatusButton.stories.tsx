import type { Meta, StoryObj } from '@storybook/react-vite';
import StatusButton from './StatusButton';

const meta: Meta<typeof StatusButton> = {
  title: 'UI/StatusButton',
  component: StatusButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼 텍스트',
    },
    ariaLabel: {
      control: 'text',
      description: '스크린 리더용 레이블',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '현황',
    ariaLabel: '현황 보기',
  },
};

export const CustomLabel: Story = {
  args: {
    label: '참여자',
    ariaLabel: '참여자 현황 보기',
  },
};
