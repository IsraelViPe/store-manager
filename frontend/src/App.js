import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
    <Route exact path="/" component={ Login } />
    </Routes>
  );
}

export default App;
