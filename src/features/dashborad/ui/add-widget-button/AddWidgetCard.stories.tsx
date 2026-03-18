import type { Meta, StoryObj } from '@storybook/react-vite';
import AddWidgetCard from './AddWidgetCard';

const meta: Meta<typeof AddWidgetCard> = {
  title: 'Page/UI/AddWidgetCard',
  component: AddWidgetCard,
  tags: ['autodocs'],
  argTypes: {
    widgetName: {
      control: 'select',
      options: ['question', 'quiz', 'file', 'note', 'vote'],
      description: '위젯별 카드',
    },
    isSelected: {
      control: 'boolean',
      description: '선택 여부',
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const QuestionIcon: Story = {
  args: {
    widgetName: 'question',
  },
};
export const QuizIcon: Story = {
  args: {
    widgetName: 'quiz',
  },
};
export const FileIcon: Story = {
  args: {
    widgetName: 'file',
  },
};
export const NoteIcon: Story = {
  args: {
    widgetName: 'note',
  },
};
export const VoteIcon: Story = {
  args: {
    widgetName: 'vote',
  },
};
export const QuestionIconSelected: Story = {
  args: {
    widgetName: 'question',
    isSelected: true,
  },
};
export const QuizIconSelected: Story = {
  args: {
    widgetName: 'quiz',
    isSelected: true,
  },
};
export const FileIconSelected: Story = {
  args: {
    widgetName: 'file',
    isSelected: true,
  },
};
export const NoteIconSelected: Story = {
  args: {
    widgetName: 'note',
    isSelected: true,
  },
};
export const VoteIconSelected: Story = {
  args: {
    widgetName: 'vote',
    isSelected: true,
  },
};
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-5">
      <div className="flex flex-col gap-[10px]">
        <AddWidgetCard
          iconName="question"
          title="질문"
          label="학생들에게 질문을 받아보세요."
        />
        <AddWidgetCard
          iconName="quiz"
          title="퀴즈"
          label="간단한 퀴즈로 학생들의 이해도를 확인해보세요."
        />
        <AddWidgetCard
          iconName="file"
          title="강의자료"
          label="학생들이 수업자료를 확인하고 다운로드할 수 있습니다."
        />
        <AddWidgetCard
          iconName="note"
          title="메모장"
          label="중요한 내용을 메모하고 학생들과 공유해보세요."
        />
        <AddWidgetCard
          iconName="vote"
          title="투표"
          label="학생들의 의견을 수집하고 결과를 확인해보세요."
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <AddWidgetCard
          iconName="question"
          title="질문"
          label="학생들에게 질문을 받아보세요."
          isSelected
        />
        <AddWidgetCard
          iconName="quiz"
          title="퀴즈"
          label="간단한 퀴즈로 학생들의 이해도를 확인해보세요"
          isSelected
        />
        <AddWidgetCard
          iconName="file"
          title="강의자료"
          label="학생들이 수업자료를 확인하고 다운로드할 수 있습니다."
          isSelected
        />
        <AddWidgetCard
          iconName="note"
          title="메모장"
          label="중요한 내용을 메모하고 학생들과 공유해보세요."
          isSelected
        />
        <AddWidgetCard
          iconName="vote"
          title="투표"
          label="학생들의 의견을 수집하고 결과를 확인해보세요."
          isSelected
        />
      </div>
    </div>
  ),
};
