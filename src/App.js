import './App.css';
import LeftSideIllustrator from './components/LeftSideIllustrator';
import LoginContainer from './components/LoginContainer';

function App() {
  return (
    //adding style just to display button on UI
    <div style={{ display: 'flex' }}>
      <LeftSideIllustrator />
      <LoginContainer />
    </div>
  );
}

export default App;
