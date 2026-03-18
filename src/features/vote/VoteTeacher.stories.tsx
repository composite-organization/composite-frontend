import type { Meta, StoryObj } from '@storybook/react-vite';
import { VoteTeacher } from './ui';

const SAMPLE_SELECTIONS_NO_VOTES = [
  { id: '1', label: '찬성' },
  { id: '2', label: '반대' },
  { id: '3', label: '기권' },
];

const SAMPLE_SELECTIONS_WITH_VOTES = [
  { id: '1', label: '찬성', voteCount: 12, votedPercentage: 60 },
  { id: '2', label: '반대', voteCount: 6, votedPercentage: 30 },
  { id: '3', label: '기권', voteCount: 2, votedPercentage: 10 },
];

const meta: Meta<typeof VoteTeacher> = {
  title: 'Feature/VoteTeacher',
  component: VoteTeacher,
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
      description: '투표 선택지 목록 (득표수, 비율 포함 가능)',
    },
    onStatusClick: {
      action: 'statusClicked',
      description: '현황 버튼 클릭 시 호출',
    },
    onStopClick: {
      action: 'stopClicked',
      description: '종료하기 버튼 클릭 시 호출',
    },
  },
};

export default meta;

type Story = StoryObj<typeof VoteTeacher>;

export const InProgress: Story = {
  args: {
    title: '점심 메뉴 투표',
    description: '투표가 진행 중입니다.',
    options: [],
    selections: SAMPLE_SELECTIONS_NO_VOTES,
  },
};

export const WithVoteResults: Story = {
  args: {
    title: '점심 메뉴 투표',
    description: '현재까지의 투표 현황입니다.',
    options: ['익명'],
    selections: SAMPLE_SELECTIONS_WITH_VOTES,
  },
};

export const WithAllOptions: Story = {
  args: {
    title: '회의 안건 투표',
    description: '다음 회의 안건을 선택해주세요.',
    options: ['익명', '복수선택'],
    selections: SAMPLE_SELECTIONS_WITH_VOTES,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex flex-col gap-2 items-center">
        <span className="label-regular text-black-200">
          투표 진행 중 (현황 없음)
        </span>
        <VoteTeacher
          title="점심 메뉴 투표"
          description="투표가 진행 중입니다."
          options={[]}
          selections={SAMPLE_SELECTIONS_NO_VOTES}
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="label-regular text-black-200">투표 현황 포함</span>
        <VoteTeacher
          title="점심 메뉴 투표"
          description="현재까지의 투표 현황입니다."
          options={['익명']}
          selections={SAMPLE_SELECTIONS_WITH_VOTES}
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="label-regular text-black-200">모든 옵션 표시</span>
        <VoteTeacher
          title="회의 안건 투표"
          description="다음 회의 안건을 선택해주세요."
          options={['익명', '복수선택']}
          selections={SAMPLE_SELECTIONS_WITH_VOTES}
        />
      </div>
    </div>
  ),
};
