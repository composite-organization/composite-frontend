import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DashBoardPage from './DashBoardPage';

const meta: Meta<typeof DashBoardPage> = {
  title: 'Page/UI/DashBoardPage',
  component: DashBoardPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    localStorage.setItem('authToken', 'storybook-token');

    return (
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter
          initialEntries={['/dashboard/ABC12345/1/수업명/수업자명']}
        >
          <Routes>
            <Route
              path="/dashboard/:lessonCode/:lessonId/:lessonName/:teacherName"
              element={<DashBoardPage />}
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  },
};
