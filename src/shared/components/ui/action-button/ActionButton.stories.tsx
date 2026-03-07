import type { Meta, StoryObj } from '@storybook/react-vite';
import ActionButton from './ActionButton';

const meta: Meta<typeof ActionButton> = {
  title: 'UI/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['edit', 'delete'],
      description: '버튼 스타일',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Edit: Story = {
  args: {
    variant: 'edit',
    children: '수정',
  },
};

export const Delete: Story = {
  args: {
    variant: 'delete',
    children: '삭제',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'edit',
    children: '수정',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-row gap-3">
      <ActionButton variant="edit">수정</ActionButton>
      <ActionButton variant="delete">삭제</ActionButton>
      <ActionButton variant="edit" disabled>
        수정
      </ActionButton>
    </div>
  ),
};
