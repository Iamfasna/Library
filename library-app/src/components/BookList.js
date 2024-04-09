import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/bookList.css';
import './Pagination.js'

function BookList({ books,currentPage }) {
 // const [bookList, setBookList] = useState([]);
 if (!Array.isArray(books)) {
  return <div>No books available</div>;
}


 let bookNo =(currentPage-1)*15;

  return (
    <div>
      {books.map((book, index ) => (
        
  <div key={index} className='book-box'>
    <Link to={`/bookDetails/${book._id}`} style={{textDecoration :"none",color:"gray"}}> 
    <h4>{++bookNo}.{book.bookName}</h4>
    </Link>
    
  </div>
))}

    
    </div>
  );
}

export default BookList;
