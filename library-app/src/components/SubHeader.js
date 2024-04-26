import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import '../styles/bookList.css';


function SubHeader({ onBookSelect, setSearchResult }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = async () => {
  //   try {
  //     const response = await Axios.get(`http://localhost:5000/searchBooks?query=${searchInput}`);
  //     setSearchResults(response.data);
  //   } catch (error) {
  //     console.error('Error searching books:', error);
  //   }
  // };
  const handleInputChange = async (e) => {
    setSearchInput(e.target.value);
    try {
      const response = await Axios.get(`http://localhost:5000/searchBooks?query=${e.target.value}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleBookSelect = (bookId) => {
    onBookSelect(bookId);
    // Optionally, clear search input and results here
    setSearchInput('');
    setSearchResult([]);
  };
  return (
    <div>
        <div className="d-flex mx-auto my-4 justify-content-between align-items-center px-4 rounded-2" style={{background:"rgba(80, 144, 145, .6)",width:"95%",height:"70px"}}>
           <div className="d-flex align-items-center">
            <div className='p-2'>
          <input type="search" className="form-control" style={{width :"20rem"}} placeholder="Search..." aria-label="Search" value={searchInput} onChange={handleInputChange}/>          
        </div>
        </div>
      
        
            
       
         <div class="dropdown">
  <button className="btn btn-secondary dropdown-toggle"   data-bs-toggle="dropdown" aria-expanded="false">
    Actions
  </button>

  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="/addBook">Add Book</a></li>
    <li><a class="dropdown-item" href="/bookIssue">Issue/Recive Book</a></li>
    
  </ul>
</div>
      </div>
      {searchResults.length > 0 && searchInput !== '' && (
        <div className="search-results">
          <h5>Search Results:</h5>
          <ul>
            {searchResults.map((book) => (
            
                <div key={book._id} className='book-box' onClick={() => handleBookSelect(book._id)}>
    <Link to={`/bookDetails/${book._id}`} style={{textDecoration :"none",color:"gray"}}> 
    <h4>{book.bookName}</h4>
    </Link>
    
  </div>
             
            ))}
          </ul>
        </div>
      )}

    </div>
    
  )
}

export default SubHeader