import React, { useState, useEffect } from 'react'
import '../styles/bookList.css'

function BookList({ books }) {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http:localhost:5000/books');
      const data = await response.json();
      setBookList(data);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <div>
        {bookList.map((book, index) => (
          <div key={index} className='book-box'>
            <h4>{index + 1}. {book.name}</h4>
          </div>
        ))}
      </div>
    </>
  )
}

export default BookList