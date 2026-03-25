import type { Meta, StoryObj } from '@storybook/react-vite';
import DashboardHeader from './DashboardHeader';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Page/UI/DashboardHeader',
  component: DashboardHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <DashboardHeader
      lessonName="수업명"
      teacherName="수업자명"
      onOpenModal={() => {}}
    />
  ),
};
