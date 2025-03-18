import './App.css';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
      <AuthProvider>
        <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            {/* Add more protected routes here as you build your app */}
            {/* For example: */}
            {/* <Route path="/expenses" element={<ExpensesPage />} /> */}
          </Route>
          
          {/* Redirect to sign in if route doesn't exist */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;
