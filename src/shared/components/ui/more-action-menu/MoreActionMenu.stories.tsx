import type { Meta, StoryObj } from '@storybook/react-vite';
import MoreActionMenu from './MoreActionMenu';

const meta: Meta<typeof MoreActionMenu> = {
  title: 'UI/MoreActionMenu',
  component: MoreActionMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative h-32 w-40">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
