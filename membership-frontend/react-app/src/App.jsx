import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MemberPage from './pages/MemberPage';
import './App.css'
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<RegisterPage />} /> {/* Moved up */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/members" element={<MemberPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
