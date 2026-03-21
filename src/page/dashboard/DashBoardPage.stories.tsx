import type { Meta, StoryObj } from '@storybook/react-vite';
import DashBoardPage from './DashBoardPage';

const meta: Meta<typeof DashBoardPage> = {
  title: 'Page/UI/DashBoardPage',
  component: DashBoardPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => <DashBoardPage lessonName="수업명" teacherName="수업자명" />,
};
