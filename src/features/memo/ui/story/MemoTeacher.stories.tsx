import type { Meta, StoryObj } from '@storybook/react-vite';
import MemoTeacher from '../MemoTeacher';

const meta: Meta<typeof MemoTeacher> = {
  title: 'Feature/MemoTeacher',
  component: MemoTeacher,
  tags: ['autodocs'],
  argTypes: {
    widgetName: {
      control: 'text',
      description: '위젯 헤더에 표시되는 위젯 이름',
    },
    widgetDescription: {
      control: 'text',
      description: '위젯 헤더에 표시되는 위젯 설명',
    },
    initialTitle: {
      control: 'text',
      description: '메모 제목 초기값',
    },
    initialMemo: {
      control: 'text',
      description: '메모 본문 초기값',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    widgetName: '메모장',
    widgetDescription: '위젯 설명',
    initialTitle: '',
    initialMemo: '',
  },
};

export const WithInitialContent: Story = {
  args: {
    widgetName: '메모장',
    widgetDescription: '위젯 설명',
    initialTitle: '오늘의 수업 계획',
    initialMemo: '1교시: 개념 설명\n2교시: 실습 문제\n3교시: 복습 및 질의응답',
  },
};

export const WithCustomWidgetInfo: Story = {
  args: {
    widgetName: '수업 메모장',
    widgetDescription: '교사용 메모 위젯',
    initialTitle: '학습 목표',
    initialMemo: '오늘 수업의 핵심 목표를 기록합니다.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <MemoTeacher
        widgetName="메모장"
        widgetDescription="위젯 설명"
        initialTitle=""
        initialMemo=""
      />
      <MemoTeacher
        widgetName="메모장"
        widgetDescription="위젯 설명"
        initialTitle="오늘의 수업 계획"
        initialMemo="1교시: 개념 설명\n2교시: 실습 문제\n3교시: 복습 및 질의응답"
      />
      <MemoTeacher
        widgetName="수업 메모장"
        widgetDescription="교사용 메모 위젯"
        initialTitle="학습 목표"
        initialMemo="오늘 수업의 핵심 목표를 기록합니다."
      />
    </div>
  ),
};
