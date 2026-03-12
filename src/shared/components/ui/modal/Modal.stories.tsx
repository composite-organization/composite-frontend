import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <Story />
      </div>
    ),
  ],
  args: {
    title: '모달 제목',
    isOpen: true,
    onClose: () => {},
    children: <div className="h-[200px]" />,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
