import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectionAddButton from './SelectionAddButton';

const meta: Meta<typeof SelectionAddButton> = {
  title: 'UI/SelectionAddButton',
  component: SelectionAddButton,
  argTypes: {
    onClick: {
      description: '버튼 클릭 핸들러',
      action: 'clicked',
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
    ariaLabel: {
      description: '스크린 리더용 접근성 레이블',
      control: 'text',
    },
    className: {
      description: '추가 Tailwind 클래스',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectionAddButton>;

export const Default: Story = {
  args: {
    disabled: false,
    ariaLabel: '항목 추가',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    ariaLabel: '항목 추가',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5 items-start">
      <SelectionAddButton ariaLabel="항목 추가" />
      <SelectionAddButton disabled ariaLabel="항목 추가 (비활성화)" />
    </div>
  ),
};
