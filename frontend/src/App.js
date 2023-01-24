import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import StoreManager from './pages/StoreManager';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Login /> } />
      <Route path='/store/manager' element={ <StoreManager /> }/>
    </Routes>
  );
}

export default App;
