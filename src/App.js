import './App.css';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { app } from './fireBase';

function App() {
  console.log(app);
  return (
    <div>
      {/* <SignUp /> */}
      {/* <HomePage /> */}
      <SignIn />
    </div>
  );
}

export default App;