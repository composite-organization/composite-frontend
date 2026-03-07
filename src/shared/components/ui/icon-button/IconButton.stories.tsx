import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: '버튼 모서리 형태',
    },
    iconName: {
      control: 'select',
      options: [
        'add',
        'close',
        'copy',
        'delete',
        'download',
        'edit',
        'info',
        'link',
        'more',
        'pin',
        'upload',
      ],
      description: '표시할 아이콘',
    },
    label: {
      control: 'text',
      description: '아이콘 옆에 표시할 텍스트 (없으면 아이콘만 표시)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SquareIconOnly: Story = {
  args: {
    shape: 'square',
    iconName: 'add',
  },
};

export const CircleIconOnly: Story = {
  args: {
    shape: 'circle',
    iconName: 'add',
  },
};

export const SquareWithLabel: Story = {
  args: {
    shape: 'square',
    iconName: 'add',
    label: '추가하기',
  },
};

export const CircleWithLabel: Story = {
  args: {
    shape: 'circle',
    iconName: 'add',
    label: '추가하기',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center">
        <IconButton shape="square" iconName="add" />
        <IconButton shape="square" iconName="add" label="추가하기" />
        <IconButton shape="circle" iconName="add" />
        <IconButton shape="circle" iconName="add" label="추가하기" />
      </div>
      <div className="flex flex-row gap-3 items-center">
        <IconButton shape="square" iconName="edit" />
        <IconButton shape="square" iconName="delete" />
        <IconButton shape="square" iconName="close" />
        <IconButton shape="square" iconName="more" />
      </div>
    </div>
  ),
};
