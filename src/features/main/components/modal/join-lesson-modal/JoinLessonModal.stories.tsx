import type { Meta, StoryObj } from '@storybook/react';
import JoinLessonModal from './JoinLessonModal';

const meta: Meta<typeof JoinLessonModal> = {
  title: 'Main/Modal/JoinLessonModal',
  component: JoinLessonModal,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    lessonCode: 'string',
    isOpen: true,
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <JoinLessonModal lessonCode="ABCD123" isOpen onClose={() => {}} />
  ),
};
