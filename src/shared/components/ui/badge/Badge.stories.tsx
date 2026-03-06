import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: '뱃지 크기',
    },
    shape: {
      control: 'select',
      options: ['square', 'round'],
      description: '뱃지 모양',
    },
    children: {
      control: 'text',
      description: '뱃지 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'medium',
    size: 'md',
    shape: 'square',
  },
};

export const Square: Story = {
  render: () => (
    <div className="flex flex-row items-center gap-5">
      <Badge size="sm" shape="square">
        small
      </Badge>
      <Badge size="md" shape="square">
        medium
      </Badge>
      <Badge size="lg" shape="square">
        large
      </Badge>
    </div>
  ),
};

export const Round: Story = {
  render: () => (
    <div className="flex flex-row items-center gap-5">
      <Badge size="xs" shape="round">
        xs
      </Badge>
      <Badge size="sm" shape="round">
        small
      </Badge>
      <Badge size="md" shape="round">
        medium
      </Badge>
      <Badge size="lg" shape="round">
        large
      </Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-5">
        <Badge size="sm" shape="square">
          small
        </Badge>
        <Badge size="md" shape="square">
          medium
        </Badge>
        <Badge size="lg" shape="square">
          large
        </Badge>
      </div>
      <div className="flex flex-row items-center gap-5">
        <Badge size="xs" shape="round">
          xs
        </Badge>
        <Badge size="sm" shape="round">
          small
        </Badge>
        <Badge size="md" shape="round">
          medium
        </Badge>
        <Badge size="lg" shape="round">
          large
        </Badge>
      </div>
    </div>
  ),
};
