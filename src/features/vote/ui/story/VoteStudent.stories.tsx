import type { Meta, StoryObj } from '@storybook/react-vite';
import { VoteStudent } from '..';

const SAMPLE_SELECTIONS_BASIC = [
  { id: '1', label: '찬성' },
  { id: '2', label: '반대' },
  { id: '3', label: '기권' },
];

const SAMPLE_SELECTIONS_WITH_VOTES = [
  { id: '1', label: '찬성', voteCount: 12, votedPercentage: 60 },
  { id: '2', label: '반대', voteCount: 6, votedPercentage: 30 },
  { id: '3', label: '기권', voteCount: 2, votedPercentage: 10 },
];

const meta: Meta<typeof VoteStudent> = {
  title: 'Feature/VoteStudent',
  component: VoteStudent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '위젯 제목',
    },
    description: {
      control: 'text',
      description: '투표 안건 설명',
    },
    options: {
      control: 'object',
      description: '투표 옵션 뱃지 목록 (예: 익명, 복수선택)',
    },
    selections: {
      control: 'object',
      description: '투표 선택지 목록',
    },
    isMultipleChoice: {
      control: 'boolean',
      description: '복수 선택 허용 여부',
    },
    onSubmit: {
      action: 'submitted',
      description: '제출 버튼 클릭 시 호출 (선택된 id 배열 전달)',
    },
    onStatusClick: {
      action: 'statusClicked',
      description: '현황 버튼 클릭 시 호출',
    },
  },
};

export default meta;

type Story = StoryObj<typeof VoteStudent>;

export const SingleChoice: Story = {
  args: {
    title: '점심 메뉴 투표',
    description: '오늘 점심 메뉴를 선택해주세요.',
    options: [],
    selections: SAMPLE_SELECTIONS_BASIC,
    isMultipleChoice: false,
  },
};

export const MultipleChoice: Story = {
  args: {
    title: '점심 메뉴 투표',
    description: '오늘 점심 메뉴를 모두 선택해주세요.',
    options: ['복수선택'],
    selections: SAMPLE_SELECTIONS_BASIC,
    isMultipleChoice: true,
  },
};

export const Anonymous: Story = {
  args: {
    title: '익명 투표',
    description: '익명으로 진행되는 투표입니다.',
    options: ['익명'],
    selections: SAMPLE_SELECTIONS_BASIC,
    isMultipleChoice: false,
  },
};

export const WithVoteResults: Story = {
  args: {
    title: '점심 메뉴 투표',
    description: '현재 투표 현황이 표시됩니다.',
    options: [],
    selections: SAMPLE_SELECTIONS_WITH_VOTES,
    isMultipleChoice: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex flex-col gap-2 items-center">
        <span className="label-regular text-black-200">단일 선택</span>
        <VoteStudent
          title="점심 메뉴 투표"
          description="오늘 점심 메뉴를 선택해주세요."
          options={[]}
          selections={SAMPLE_SELECTIONS_BASIC}
          isMultipleChoice={false}
          onSubmit={() => {}}
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="label-regular text-black-200">복수 선택</span>
        <VoteStudent
          title="점심 메뉴 투표"
          description="원하는 메뉴를 모두 선택해주세요."
          options={['복수선택']}
          selections={SAMPLE_SELECTIONS_BASIC}
          isMultipleChoice
          onSubmit={() => {}}
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="label-regular text-black-200">투표 현황 포함</span>
        <VoteStudent
          title="점심 메뉴 투표"
          description="현재까지 투표 결과입니다."
          options={['익명']}
          selections={SAMPLE_SELECTIONS_WITH_VOTES}
          isMultipleChoice={false}
          onSubmit={() => {}}
        />
      </div>
    </div>
  ),
};
