import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectionButton from './SelectionButton';

const meta: Meta<typeof SelectionButton> = {
  title: 'UI/SelectionButton',
  component: SelectionButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'hover', 'selected'],
      description: '버튼의 시각적 상태',
    },
    label: {
      control: 'text',
      description: '버튼 내부에 표시할 텍스트 또는 숫자',
    },
    ariaLabel: {
      control: 'text',
      description: '접근성 레이블',
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
    label: '1',
    variant: 'default',
  },
};

export const Hover: Story = {
  args: {
    label: '2',
    variant: 'hover',
  },
};

export const Selected: Story = {
  args: {
    label: '3',
    variant: 'selected',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-row gap-5 items-center justify-center p-5">
      <div className="flex flex-col gap-2 items-center">
        <span className="caption-regular text-black-300">Default</span>
        <SelectionButton label="1" variant="default" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="caption-regular text-black-300">Hover</span>
        <SelectionButton label="2" variant="hover" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="caption-regular text-black-300">Selected</span>
        <SelectionButton label="3" variant="selected" />
      </div>
    </div>
  ),
};
