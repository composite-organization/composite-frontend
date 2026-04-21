import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/page/main/MainPage';
import DashBoardPage from '@/page/dashboard/DashBoardPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/dashboard/:lessonName/:teacherName"
          element={<DashBoardPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
