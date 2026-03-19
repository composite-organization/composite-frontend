import type { Meta, StoryObj } from '@storybook/react-vite';
import SectionDivider from './SectionDivider';

const meta: Meta<typeof SectionDivider> = {
  title: 'MAIN/SectionDivider',
  component: SectionDivider,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SectionDivider text="카드를 클릭해 위젯 기능을 미리 확인해보세요" />
    </div>
  ),
};
