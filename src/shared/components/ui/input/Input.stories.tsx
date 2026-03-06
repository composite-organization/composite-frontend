import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'selected', 'disabled'],
      description: '입력 상태',
    },
    title: {
      control: 'text',
      description: '상단 라벨 (타이틀 포함형)',
    },
    checkbox: {
      control: 'boolean',
      description: '우측 체크박스 표시 여부',
    },
    checkboxChecked: {
      control: 'boolean',
      description: '체크박스 checked 상태',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본형
export const Default: Story = {
  args: {
    state: 'default',
    placeholder: '예: 현대사회와 문명',
  },
};

export const Normal: Story = {
  args: {
    state: 'default',
    defaultValue: '현대사회와 문명',
    placeholder: '예: 현대사회와 문명',
  },
};

export const Selected: Story = {
  args: {
    state: 'selected',
    defaultValue: '현대사회와 문명',
    placeholder: '예: 현대사회와 문명',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    defaultValue: '수정불가',
  },
};

// 체크박스 포함형
export const WithCheckbox: Story = {
  args: {
    state: 'default',
    placeholder: '예: 현대사회와 문명',
    checkbox: true,
  },
};

export const WithCheckboxChecked: Story = {
  args: {
    state: 'default',
    defaultValue: '현대사회와 문명',
    checkbox: true,
    checkboxChecked: true,
  },
};

export const WithCheckboxDisabled: Story = {
  args: {
    state: 'disabled',
    defaultValue: '수정불가',
    checkbox: true,
  },
};

// 타이틀 포함형
export const WithTitle: Story = {
  args: {
    state: 'default',
    title: '수업자명',
    placeholder: '예: 홍길동',
  },
};

export const WithTitleNormal: Story = {
  args: {
    state: 'default',
    title: '수업자명',
    defaultValue: '홍길동',
    placeholder: '예: 홍길동',
  },
};

export const WithTitleDisabled: Story = {
  args: {
    state: 'disabled',
    title: '수업자명',
    defaultValue: '수정불가',
  },
};

// 타이틀 + 체크박스 포함형
export const WithTitleAndCheckbox: Story = {
  args: {
    state: 'default',
    title: '수업자명',
    placeholder: '예: 홍길동',
    checkbox: true,
  },
};

export const WithTitleAndCheckboxDisabled: Story = {
  args: {
    state: 'disabled',
    title: '수업자명',
    defaultValue: '수정불가',
    checkbox: true,
  },
};

// 4가지 조합 전체 보기
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-100">
      <div className="flex flex-col gap-4">
        <p className="body-semibold text-black-400">기본형</p>
        <Input state="default" placeholder="예: 현대사회와 문명" />
        <Input
          state="default"
          defaultValue="현대사회와 문명"
          placeholder="예: 현대사회와 문명"
        />
        <Input
          state="selected"
          defaultValue="현대사회와 문명"
          placeholder="예: 현대사회와 문명"
        />
        <Input state="disabled" defaultValue="수정불가" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="body-semibold text-black-400">체크박스 포함형</p>
        <Input state="default" placeholder="예: 현대사회와 문명" checkbox />
        <Input
          state="default"
          defaultValue="현대사회와 문명"
          checkbox
          checkboxChecked
        />
        <Input state="disabled" defaultValue="수정불가" checkbox />
      </div>

      <div className="flex flex-col gap-4">
        <p className="body-semibold text-black-400">타이틀 포함형</p>
        <Input state="default" title="수업자명" placeholder="예: 홍길동" />
        <Input
          state="default"
          title="수업자명"
          defaultValue="홍길동"
          placeholder="예: 홍길동"
        />
        <Input state="selected" title="수업자명" defaultValue="홍길동" />
        <Input state="disabled" title="수업자명" defaultValue="수정불가" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="body-semibold text-black-400">타이틀 + 체크박스 포함형</p>
        <Input
          state="default"
          title="수업자명"
          placeholder="예: 홍길동"
          checkbox
        />
        <Input
          state="selected"
          title="수업자명"
          defaultValue="홍길동"
          checkbox
          checkboxChecked
        />
        <Input
          state="disabled"
          title="수업자명"
          defaultValue="수정불가"
          checkbox
        />
      </div>
    </div>
  ),
};
