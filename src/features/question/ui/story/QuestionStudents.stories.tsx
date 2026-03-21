import type { Meta, StoryObj } from '@storybook/react';
import QuestionStudent from '../QuestionStudent';

const meta: Meta<typeof QuestionStudent> = {
  title: 'QUESTION/QuestionStudent',
  component: QuestionStudent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <QuestionStudent />
    </div>
  ),
};
