import type { Meta, StoryObj } from '@storybook/react';
import FindLessonModal from './FindLessonModal';

const meta: Meta<typeof FindLessonModal> = {
  title: 'Main/Modal/FindLessonModal',
  component: FindLessonModal,
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
    <FindLessonModal lessonCode="ABCD123" isOpen onClose={() => {}} />
  ),
};
