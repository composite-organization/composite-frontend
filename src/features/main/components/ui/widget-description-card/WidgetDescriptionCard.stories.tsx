import type { Meta, StoryObj } from '@storybook/react-vite';
import WidgetDescriptionCard from './WidgetDescriptionCard';

const meta: Meta<typeof WidgetDescriptionCard> = {
  title: 'MAIN/WidgetDescriptionCard',
  component: WidgetDescriptionCard,
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

export const InfoIcon: Story = {
  args: {
    iconName: 'info',
  },
};
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
    <div className="flex gap-4">
      <div className="flex flex-col gap-3 items-center">
        <WidgetDescriptionCard
          iconName="info"
          title="수업 정보"
          description="수업명, 수업시간, 수업 장소 등 수업의 핵심 정보들을 공지할 수 있습니다."
        />
        <WidgetDescriptionCard
          iconName="note"
          title="메모장"
          description="수업의 흐름을 놓치지 않는 실시간 중요한 안내 사항이나 학습 팁을 가볍게 메모하고 공유하세요."
        />
        <WidgetDescriptionCard
          iconName="file"
          title="파일"
          description="강의 교안, 참고 링크, 보조 자료를 위젯에 업로드하세요. 학생들이 여기저기 찾을 필요 없이 즉시 내려받을 수 있습니다."
        />
        <WidgetDescriptionCard
          iconName="quiz"
          title="퀴즈"
          description="클릭 몇 번으로 복잡한 설정 없이 객관식 퀴즈를 빠르게 생성하고, 학생들의 참여 현황과 결과를 실시간으로 확인하세요."
        />
        <WidgetDescriptionCard
          iconName="vote"
          title="투표"
          description="수업 만족도부터 학습 피드백까지, 설문을 통해 학생들의 생각을 빠르게 듣고 수업에 반영할 수 있습니다."
        />
        <WidgetDescriptionCard
          iconName="question"
          title="질문"
          description="수업 중 궁금한 점을 자유롭게 질문하고, 실시간으로 답변을 받아보세요."
        />
      </div>
      <div className="flex flex-col gap-3 items-center">
        <WidgetDescriptionCard
          isSelected
          iconName="info"
          title="수업 정보"
          description="수업명, 수업시간, 수업 장소 등 수업의 핵심 정보들을 공지할 수 있습니다."
        />
        <WidgetDescriptionCard
          isSelected
          iconName="note"
          title="메모장"
          description="수업의 흐름을 놓치지 않는 실시간 중요한 안내 사항이나 학습 팁을 가볍게 메모하고 공유하세요."
        />
        <WidgetDescriptionCard
          isSelected
          iconName="file"
          title="파일"
          description="강의 교안, 참고 링크, 보조 자료를 위젯에 업로드하세요. 학생들이 여기저기 찾을 필요 없이 즉시 내려받을 수 있습니다."
        />
        <WidgetDescriptionCard
          isSelected
          iconName="quiz"
          title="퀴즈"
          description="클릭 몇 번으로 복잡한 설정 없이 객관식 퀴즈를 빠르게 생성하고, 학생들의 참여 현황과 결과를 실시간으로 확인하세요."
        />
        <WidgetDescriptionCard
          isSelected
          iconName="vote"
          title="투표"
          description="수업 만족도부터 학습 피드백까지, 설문을 통해 학생들의 생각을 빠르게 듣고 수업에 반영할 수 있습니다."
        />
        <WidgetDescriptionCard
          isSelected
          iconName="question"
          title="질문"
          description="수업 중 궁금한 점을 자유롭게 질문하고, 실시간으로 답변을 받아보세요."
        />
      </div>
    </div>
  ),
};
