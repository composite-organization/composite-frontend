import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectableButton from './SelectableButton';

const meta: Meta<typeof SelectableButton> = {
  title: 'UI/SelectableButton',
  component: SelectableButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['like'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm'],
      description: '버튼 크기',
    },
    isSelected: {
      control: 'boolean',
      description: '선택 상태 여부',
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
        'thumbs-up',
        'thumbs-up-fill',
      ],
      description: '기본 아이콘',
    },
    selectedIconName: {
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
        'thumbs-up',
        'thumbs-up-fill',
      ],
      description: '선택 시 표시할 아이콘',
    },
    label: {
      control: 'text',
      description: '버튼 텍스트 레이블',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LikeDefault: Story = {
  args: {
    variant: 'like',
    size: 'xxs',
    isSelected: false,
    iconName: 'thumbs-up',
    selectedIconName: 'thumbs-up-fill',
    label: '12',
    iconSize: 10,
  },
};

export const LikeSelected: Story = {
  args: {
    variant: 'like',
    size: 'xxs',
    isSelected: true,
    iconName: 'thumbs-up',
    selectedIconName: 'thumbs-up-fill',
    label: '13',
    iconSize: 10,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center">
        <span className="w-12 text-sm text-gray-400">XXS:</span>
        <SelectableButton
          variant="like"
          size="xxs"
          iconName="thumbs-up"
          selectedIconName="thumbs-up-fill"
          label="12"
          iconSize={10}
        />
        <SelectableButton
          variant="like"
          size="xxs"
          isSelected
          iconName="thumbs-up"
          selectedIconName="thumbs-up-fill"
          label="13"
          iconSize={10}
        />
      </div>
      <div className="flex flex-row gap-3 items-center">
        <span className="w-12 text-sm text-gray-400">XS:</span>
        <SelectableButton
          variant="like"
          size="xs"
          iconName="thumbs-up"
          selectedIconName="thumbs-up-fill"
          label="좋아요"
          iconSize={12}
        />
        <SelectableButton
          variant="like"
          size="xs"
          isSelected
          iconName="thumbs-up"
          selectedIconName="thumbs-up-fill"
          label="좋아요"
          iconSize={12}
        />
      </div>
      <div className="flex flex-row gap-3 items-center">
        <span className="w-12 text-sm text-gray-400">SM:</span>
        <SelectableButton
          variant="like"
          size="sm"
          iconName="thumbs-up"
          selectedIconName="thumbs-up-fill"
          label="좋아요"
          iconSize={14}
        />
        <SelectableButton
          variant="like"
          size="sm"
          isSelected
          iconName="thumbs-up"
          selectedIconName="thumbs-up-fill"
          label="좋아요"
          iconSize={14}
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'like',
    size: 'xxs',
    disabled: true,
    iconName: 'thumbs-up',
    label: '12',
    iconSize: 10,
  },
};
