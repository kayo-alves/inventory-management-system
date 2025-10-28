import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import IndexPage from './pages/index/IndexPage';
import TesteProduto from './pages/testeProduto';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/index" element={<IndexPage />} />
      <Route path="/testeProduto" element={<TesteProduto />} />
    </Routes>
  );
}

export default App;