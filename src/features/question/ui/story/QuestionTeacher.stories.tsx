import type { Meta, StoryObj } from '@storybook/react';
import QuestionTeacher from '../QuestionTeacher';

const meta: Meta<typeof QuestionTeacher> = {
  title: 'QUESTION/QuestionTeacher',
  component: QuestionTeacher,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <QuestionTeacher />
    </div>
  ),
};
