import type { Meta, StoryObj } from '@storybook/react-vite';
import AddWidgetModal from './AddWidgetModal';

const meta: Meta<typeof AddWidgetModal> = {
  title: 'Page/UI/AddWidgetModal',
  component: AddWidgetModal,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => <AddWidgetModal isOpen onClose={() => {}} />,
};
