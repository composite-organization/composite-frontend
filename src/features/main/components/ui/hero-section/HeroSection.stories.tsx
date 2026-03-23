import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroSection from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'MAIN/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <HeroSection />
    </div>
  ),
};
