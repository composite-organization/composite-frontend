import type { Meta, StoryObj } from '@storybook/react-vite';
import EntranceSection from './EntranceSection';

const meta: Meta<typeof EntranceSection> = {
  title: 'MAIN/EntranceSection',
  component: EntranceSection,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <EntranceSection
        onJoin={() => {
          console.log('Join');
        }}
        onFind={() => {
          console.log('Find');
        }}
        onCreate={() => {
          console.log('Create');
        }}
      />
    </div>
  ),
};
