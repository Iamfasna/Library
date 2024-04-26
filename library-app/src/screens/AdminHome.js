import React, { useEffect, useState  } from 'react';
import SubHeader from '../components/SubHeader';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import {useNavigate}  from "react-router-dom";


function AdminHome() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchResults, setSearchResult] = useState([]);
  const Navigation =useNavigate()
  const [searchPerformed, setSearchPerformed] = useState(false);

 const handleBookSelect = (bookId) => {
  setSelectedBookId(bookId);
};

//Redirect to BookDetails page when a book is selected
if (selectedBookId) {
  Navigation(`/bookDetails/${selectedBookId}`);
  // Reset selectedBookId to null to prevent redirecting on subsequent renders
  setSelectedBookId(null);
}


  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/adminHome');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const onPageChange = (page) => {
    console.log(`Page ${page} selected`);
    setCurrentPage(page);
  };
  const handleSearchResults = (results) => {
    setSearchResult(results);
    setSearchPerformed(true);
  };

  // Calculate the index of the first book to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  // Slice the books array to display only the books for the current page
  const displayedBooks = books.slice(startIndex, startIndex + pageSize);

 

  return (
    <div>
      <Header />
      <div className="mt-5">
        <SubHeader onBookSelect={handleBookSelect} setSearchResult={handleSearchResults}  />
        {!searchPerformed && (
          <div className="book-box-container">
            <BookList books={displayedBooks} currentPage={currentPage} />
            <Pagination totalBooks={books.length} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange} />
          </div>
        )}
        {searchPerformed && (
          <div>
            <h3>Search Results</h3>
            <BookList books={searchResults} currentPage={currentPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
