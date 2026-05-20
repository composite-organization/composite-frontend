import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/page/main/MainPage';
import DashBoardPage from '@/page/dashboard/DashBoardPage';
import './App.css';

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/dashboard/:lessonCode/:lessonId/:lessonName/:teacherName"
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
