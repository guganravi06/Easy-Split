import './App.css';
import Button from './components/Button';
import LeftSideIllustrator from './components/LeftSideIllustrator';

function App() {
  return (
    //adding style just to display button on UI
    <div style={{display:'flex'}}>
      <LeftSideIllustrator />
      <Button text="Login" icon='./assets/google-logo-icon.png' textAlign='center'/>
    </div>
  );
}

export default App;
