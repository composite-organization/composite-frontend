import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroBadge from './HeroBadge';

const meta: Meta<typeof HeroBadge> = {
  title: 'MAIN/HeroBadge',
  component: HeroBadge,
  tags: ['autodocs'],
  argTypes: {
    badgeName: {
      control: 'text',
      options: ['module', 'PC', 'chat'],
      description: '뱃지 텍스트',
    },
    label: {
      control: 'text',
      description: '뱃지 설명',
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const InfoIcon: Story = {
  args: {
    badgeName: 'module',
    label: '위젯형 대시보드',
  },
};
export const NoteIcon: Story = {
  args: {
    badgeName: 'PC',
    label: '웹 PC 수업 환경',
  },
};
export const FileIcon: Story = {
  args: {
    badgeName: 'chat',
    label: '실시간 피드백',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center">
        <HeroBadge badgeName="module" label="위젯형 대시보드" />
        <HeroBadge badgeName="PC" label="웹 PC 수업 환경" />
        <HeroBadge badgeName="chat" label="실시간 피드백" />
      </div>
    </div>
  ),
};
