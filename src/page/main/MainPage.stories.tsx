import type { Meta, StoryObj } from '@storybook/react-vite';
import MainPage from './MainPage';

const meta: Meta<typeof MainPage> = {
  title: 'MAIN/MainPage',
  component: MainPage,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <MainPage />,
};
