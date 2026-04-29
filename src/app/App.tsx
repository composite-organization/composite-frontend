import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/page/main/MainPage';
import DashBoardPage from '@/page/dashboard/DashBoardPage';
import { useGetGuestTokenMutation } from '@/features/guest/api/guest.queries';
import { setAuthToken } from '@/lib/http';
import './App.css';

function AppContent() {
  const getGuestTokenMutation = useGetGuestTokenMutation();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const key = 'composite_guest_token';
    const token = localStorage.getItem(key);

    if (!token) {
      getGuestTokenMutation.mutate(
        { name: 'guest' },
        {
          onSuccess: (data) => {
            localStorage.setItem(key, data.token);
            setAuthToken(data.token);
          },
        },
      );
    } else {
      setAuthToken(token);
    }
  }, [getGuestTokenMutation]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/dashboard/:lessonName/:teacherName"
        element={<DashBoardPage />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
