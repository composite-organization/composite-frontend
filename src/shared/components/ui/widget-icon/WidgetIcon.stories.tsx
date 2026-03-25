import type { Meta, StoryObj } from '@storybook/react-vite';
import WidgetIcon from './WidgetIcon';

const meta: Meta<typeof WidgetIcon> = {
  title: 'UI/WidgetIcon',
  component: WidgetIcon,
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: ['info', 'note', 'file', 'quiz', 'vote', 'question'],
      description: '표시할 아이콘',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NoteIcon: Story = {
  args: {
    iconName: 'note',
  },
};
export const FileIcon: Story = {
  args: {
    iconName: 'file',
  },
};
export const QuizIcon: Story = {
  args: {
    iconName: 'quiz',
  },
};
export const VoteIcon: Story = {
  args: {
    iconName: 'vote',
  },
};
export const QuestionIcon: Story = {
  args: {
    iconName: 'question',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center">
        <WidgetIcon iconName="note" />
        <WidgetIcon iconName="file" />
        <WidgetIcon iconName="quiz" />
        <WidgetIcon iconName="vote" />
        <WidgetIcon iconName="question" />
      </div>
    </div>
  ),
};
