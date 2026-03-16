import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ToggleButton from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  title: 'UI/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '토글 on/off 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    ariaLabel: {
      control: 'text',
      description: '접근성 레이블',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    checked: true,
    disabled: false,
    ariaLabel: '토글',
  },
};

export const Off: Story = {
  args: {
    checked: false,
    disabled: false,
    ariaLabel: '토글',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    ariaLabel: '토글',
  },
};

export const DisabledOn: Story = {
  args: {
    checked: true,
    disabled: true,
    ariaLabel: '토글',
  },
};

function InteractiveToggle() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <ToggleButton
        checked={isChecked}
        onChange={setIsChecked}
        ariaLabel="인터랙티브 토글"
      />
      <span style={{ fontSize: '14px', color: '#363636' }}>
        {isChecked ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveToggle />,
};

function AllStatesToggle() {
  const [firstChecked, setFirstChecked] = useState(true);
  const [secondChecked, setSecondChecked] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ToggleButton
          checked={firstChecked}
          onChange={setFirstChecked}
          ariaLabel="켜짐 상태"
        />
        <span style={{ fontSize: '14px' }}>On (blue-300)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ToggleButton
          checked={secondChecked}
          onChange={setSecondChecked}
          ariaLabel="꺼짐 상태"
        />
        <span style={{ fontSize: '14px' }}>Off (black-200)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ToggleButton checked disabled ariaLabel="켜짐 비활성화" />
        <span style={{ fontSize: '14px' }}>On + Disabled</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ToggleButton checked={false} disabled ariaLabel="꺼짐 비활성화" />
        <span style={{ fontSize: '14px' }}>Off + Disabled</span>
      </div>
    </div>
  );
}

export const AllStates: Story = {
  render: () => <AllStatesToggle />,
};
