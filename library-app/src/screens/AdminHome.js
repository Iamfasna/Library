import React, { useEffect, useState } from 'react'
import SubHeader from '../components/SubHeader'
import BookList from '../components/BookList'
import Pagination from '../components/Pagination'
import Header from '../components/Header';

function AdminHome( ) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      const booksWithSerialNumbers = data.map((book, index) => ({...book, serialNumber: index + 1 }));
      setBooks(booksWithSerialNumbers);
    };

    fetchBooks();
  }, []);

 

  

  const pageSize = 15;
  const onPageChange = (page) => {
    console.log(`Page ${page} selected`);
  };

  if (!books) {
    return null;
  }

  return (
    <div>
      <Header/>
     
    <div className="mt-5">
         <SubHeader />
    <div className="book-box-container">
      <BookList books={books.slice(0, pageSize)} />
      <Pagination books={books} pageSize={pageSize} onPageChange={onPageChange} />
    </div>
  </div>
  </div>
  )
}

export default AdminHome