import './App.css';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
