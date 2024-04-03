import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import AdminHome from './screens/AdminHome';

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/adminHome" element={<AdminHome/>}></Route>
          
        </Routes>
      </Router>
    
    </div>
    
  );
}

export default App;
