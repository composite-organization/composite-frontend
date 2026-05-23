import type { Meta, StoryObj } from '@storybook/react';
import {
  StudentWidgetContainer,
  TeacherWidgetContainer,
} from './WidgetContainer';

const meta: Meta<typeof TeacherWidgetContainer> = {
  title: 'Widget/WidgetContainer',
  component: TeacherWidgetContainer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = (
  <div className="flex flex-col gap-3 px-4 pt-4 pb-5">
    <p className="body-regular text-black-500">
      위젯 본문 영역에 들어가는 콘텐츠입니다.
    </p>
    <div className="h-12 rounded-xl bg-black-50" />
    <div className="h-12 rounded-xl bg-black-50" />
  </div>
);

export const Teacher: Story = {
  render: () => (
    <TeacherWidgetContainer
      iconName="quiz"
      title="퀴즈"
      description="퀴즈 위젯"
    >
      {sampleContent}
    </TeacherWidgetContainer>
  ),
};

export const Student: Story = {
  render: () => (
    <StudentWidgetContainer
      iconName="quiz"
      title="퀴즈"
      description="퀴즈 위젯"
    >
      {sampleContent}
    </StudentWidgetContainer>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TeacherWidgetContainer
        iconName="note"
        title="수업자 메모"
        description="옵션 버튼 표시"
      >
        {sampleContent}
      </TeacherWidgetContainer>
      <StudentWidgetContainer
        iconName="note"
        title="학생 메모"
        description="옵션 버튼 없음"
      >
        {sampleContent}
      </StudentWidgetContainer>
    </div>
  ),
};
