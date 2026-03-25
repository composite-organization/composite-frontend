import type { Meta, StoryObj } from '@storybook/react';
import CreateLessonModal from './CreateLessonModal';

const meta = {
  title: 'Main/Modal/CreateLessonModal',
  component: CreateLessonModal,
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
    isOpen: true,
    onClose: () => {},
    lessonCode: 'ABCDEF2D',
  },
} satisfies Meta<typeof CreateLessonModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
