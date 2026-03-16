import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectionDeleteButton from './SelectionDeleteButton';

const meta: Meta<typeof SelectionDeleteButton> = {
  title: 'UI/SelectionDeleteButton',
  component: SelectionDeleteButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-row gap-6 items-center p-6 bg-black-50 rounded-lg">
      <div className="flex flex-col gap-2 items-center">
        <span className="caption-regular text-black-300">Default</span>
        <SelectionDeleteButton />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="caption-regular text-black-300">Disabled</span>
        <SelectionDeleteButton disabled />
      </div>
    </div>
  ),
};
