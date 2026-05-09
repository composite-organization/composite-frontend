import type { Meta, StoryObj } from '@storybook/react';
import DashboardHeader from './DashboardHeader';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Widget/DashboardHeader',
  component: DashboardHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    entryCode: {
      control: 'text',
      description: '수업 입장 코드',
    },
    dashboardUrl: {
      control: 'text',
      description: '대시보드 링크 URL',
    },
    participantCount: {
      control: 'number',
      description: '참여 인원 수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {
  args: {
    entryCode: 'KDDEHG',
    dashboardUrl: 'https://example.com/dashboard',
    participantCount: 14,
  },
};

export const HighParticipantCount: Story = {
  args: {
    entryCode: 'ABCDEF',
    dashboardUrl: 'https://example.com/dashboard/large',
    participantCount: 128,
  },
};

export const ShortCode: Story = {
  args: {
    entryCode: 'XY1234',
    dashboardUrl: 'https://example.com/dashboard/short',
    participantCount: 3,
  },
};
