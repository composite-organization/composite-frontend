import type { Meta, StoryObj } from '@storybook/react-vite';
import MemoStudent from '../MemoStudent';

const meta: Meta<typeof MemoStudent> = {
  title: 'Feature/MemoStudent',
  component: MemoStudent,
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
    title: {
      control: 'text',
      description: '메모 제목',
    },
    memo: {
      control: 'text',
      description: '메모 본문 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    widgetName: '메모장',
    widgetDescription: '위젯 설명',
    title: '오늘의 수업 내용',
    memo: '수업에서 배운 내용을 정리합니다. 핵심 개념과 예제를 복습하고, 다음 시간에 질문할 내용을 준비합니다.',
  },
};

export const WithEmptyMemo: Story = {
  args: {
    widgetName: '메모장',
    widgetDescription: '위젯 설명',
    title: '제목만 있는 메모',
    memo: '',
  },
};

export const WithCustomWidgetInfo: Story = {
  args: {
    widgetName: '나의 메모장',
    widgetDescription: '개인 학습 기록용',
    title: '수학 공식 정리',
    memo: '이차방정식의 근의 공식: x = (-b ± √(b²-4ac)) / 2a',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <MemoStudent
        widgetName="메모장"
        widgetDescription="위젯 설명"
        title="오늘의 수업 내용"
        memo="수업에서 배운 내용을 정리합니다. 핵심 개념과 예제를 복습하고, 다음 시간에 질문할 내용을 준비합니다."
      />
      <MemoStudent
        widgetName="메모장"
        widgetDescription="위젯 설명"
        title="제목만 있는 메모"
        memo=""
      />
      <MemoStudent
        widgetName="나의 메모장"
        widgetDescription="개인 학습 기록용"
        title="수학 공식 정리"
        memo="이차방정식의 근의 공식: x = (-b ± √(b²-4ac)) / 2a"
      />
    </div>
  ),
};
