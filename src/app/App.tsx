import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/page/main/MainPage';
import DashBoardPage from '@/page/dashboard/DashBoardPage';
import { useGetGuestTokenMutation } from '@/features/guest/api/guest.queries';
import { setAuthToken } from '@/lib/http';
import './App.css';

function AppContent() {
  const getGuestTokenMutation = useGetGuestTokenMutation();
  const initializedRef = useRef(false);
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const key = 'composite_guest_token';
    const token = localStorage.getItem(key);

    console.log('[App] Token initialization started. Cached token:', !!token);

    if (!token) {
      console.log('[App] No cached token. Requesting guest credentials...');
      setTimeout(() => {
        console.log('[App] Mutation status:', {
          isPending: getGuestTokenMutation.isPending,
          isSuccess: getGuestTokenMutation.isSuccess,
          isError: getGuestTokenMutation.isError,
          error: getGuestTokenMutation.error,
        });
      }, 1000);

      getGuestTokenMutation.mutate(
        { name: 'guest' },
        {
          onSuccess: (data) => {
            console.log('[App] Guest token received:', data);
            localStorage.setItem(key, data.token);
            setAuthToken(data.token);
            console.log('[App] Auth token set');
            setIsTokenReady(true);
          },
          onError: (error) => {
            console.error('[App] Guest token request failed:', error);
            setIsTokenReady(true);
          },
        },
      );
    } else {
      console.log('[App] Using cached token');
      setAuthToken(token);
      setIsTokenReady(true);
    }
  }, [getGuestTokenMutation]);

  if (!isTokenReady) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Loading...
      </div>
    );
  }

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
