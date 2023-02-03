import './App.css';
import Homepage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/sign-up" element= {<Signup />}/>
        <Route path="/log-in" element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
