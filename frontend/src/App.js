import './App.css';
import { Route, Routes } from 'react-router-dom'
import StoreManager from './pages/StoreManager';

function App() {
  return (
    <Routes>
      <Route path='/store' element={ <StoreManager /> }/>
    </Routes>
  );
}

export default App;
