import './App.css';
import InputField from './components/InputField';
// import LeftSideIllustrator from './components/LeftSideIllustrator';

function App() {
  return (
    <div>
      {/* <LeftSideIllustrator /> */}
      <InputField 
        label="name"
        type="password"
        placeholder="Password"  
      />
    </div>
  );
}

export default App;
