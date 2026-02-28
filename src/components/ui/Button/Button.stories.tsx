import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    type: {
      control: 'select',
      options: ['button', 'submit'],
      description: '버튼 타입',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '버튼',
    size: 'md',
    disabled: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
      <Button size="xl">xl</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'disabled',
    size: 'md',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button size="md">기본 버튼</Button>
        <Button size="md" disabled>
          disabled
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button size="xs">xs</Button>
        <Button size="sm">sm</Button>
        <Button size="md">md</Button>
        <Button size="lg">lg</Button>
        <Button size="xl">xl</Button>
      </div>
    </div>
  ),
};
