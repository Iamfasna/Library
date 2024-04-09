import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminHome from './screens/AdminHome';
import AddBook from './screens/AddBook';
import AddStudent from './screens/AddStudent';
import BookDetails from './screens/BookDetails';
import BookIssue from './screens/BookIssue';
import BookIssueclone from './screens/BookIssueclone';
import EditBook from './screens/EditBook';

function App() {
  return (
    <div>

     

      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/adminHome" element={<AdminHome />}></Route>
          <Route path="/addBook" element={<AddBook />}></Route>
          <Route path="/addStudent" element={<AddStudent />}></Route>
          <Route path="/bookIssue" element={<BookIssue />}></Route>
          <Route path="/bookIssueclone/:admissionNo" element={<BookIssueclone />} />
          <Route path="/bookDetails/:id" element={<BookDetails />}> </Route>
          <Route path="/editBook/:id" element={<EditBook />}> </Route>
        </Routes>
      </Router>

    </div >

  );
}

export default App;
