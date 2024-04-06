import React from 'react'
import SubHeader from '../components/SubHeader'
import BookList from '../components/BookList'
import Pagination from '../components/Pagination'
import Header from '../components/Header';

function AdminHome() {
  const books = Array.from({ length: 5000 }, (_, i) => `Book ${i + 1}`);
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