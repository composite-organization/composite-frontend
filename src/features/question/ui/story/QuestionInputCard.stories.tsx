import type { Meta, StoryObj } from '@storybook/react';
import QuestionInputCard from '@/features/question/ui/blocks/QuestionInputCard';

const meta: Meta<typeof QuestionInputCard> = {
  title: 'QUESTION/QuestionInputCard',
  component: QuestionInputCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <QuestionInputCard />
    </div>
  ),
};
