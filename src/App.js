import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import Authenticaton from './Components/Authentication/Authentication';

function App() {
  return (
    <div className="">

      <Routes>
          <Route path="/*" element={true?<HomePage></HomePage>:<Authenticaton></Authenticaton>}>
          </Route>

      </Routes>
      
    </div>
  );
}

export default App;
