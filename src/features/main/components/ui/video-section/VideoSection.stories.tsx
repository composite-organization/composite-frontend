import type { Meta, StoryObj } from '@storybook/react-vite';
import VideoSection from './VideoSection';

const meta: Meta<typeof VideoSection> = {
  title: 'MAIN/VideoSection',
  component: VideoSection,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div className="flex gap-2">
      <VideoSection selectedId="question" />
      <VideoSection selectedId="quiz" />
      <VideoSection selectedId="file" />
      <VideoSection selectedId="note" />
      <VideoSection selectedId="vote" />
    </div>
  ),
};
