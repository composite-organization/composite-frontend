import type { Meta, StoryObj } from '@storybook/react-vite';
import EntranceForm from './EntranceForm';

const meta: Meta<typeof EntranceForm> = {
  title: 'MAIN/EntranceForm',
  component: EntranceForm,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <div className="flex flex-col">
      <EntranceForm
        id="exam"
        description="수업 코드를 공유 받았다면?"
        title="수업에 참여하기"
        placeholder="수업 코드 입력하기"
        onSubmitCode={() => {
          console.log('submit');
        }}
      />
    </div>
  ),
};
