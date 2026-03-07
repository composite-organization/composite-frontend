import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['cancel', 'submit', 'blue', 'danger'],
      description: '버튼 스타일',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Cancel: Story = {
  args: {
    children: '취소',
    variant: 'cancel',
    size: 'xl',
  },
};

export const Submit: Story = {
  args: {
    children: 'Submit',
    variant: 'submit',
    size: 'xl',
  },
};

export const Blue: Story = {
  args: {
    children: 'Submit',
    variant: 'blue',
    size: 'xl',
  },
};

export const Danger: Story = {
  args: {
    children: 'delete',
    variant: 'danger',
    size: 'xl',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    variant: 'submit',
    size: 'xl',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
      }}
    >
      <Button variant="cancel" size="xl">
        취소
      </Button>
      <Button variant="submit" size="xl">
        Submit
      </Button>
      <Button variant="blue" size="xl">
        Submit
      </Button>
      <Button variant="danger" size="xl">
        delete
      </Button>
      <Button variant="submit" size="xl" disabled>
        비활성화
      </Button>
    </div>
  ),
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
      <Button variant="submit" size="xs">
        xs
      </Button>
      <Button variant="submit" size="sm">
        sm
      </Button>
      <Button variant="submit" size="md">
        md
      </Button>
      <Button variant="submit" size="lg">
        lg
      </Button>
      <Button variant="submit" size="xl">
        xl
      </Button>
    </div>
  ),
};
