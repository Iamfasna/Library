import React from 'react'
import '../styles/bookList.css'

function BookList({ books }) {
    return (
    <>
        <div>
            {books.map((book, index) => (
                <div key={index} className='book-box'>
                    <h4>{book}</h4>
                </div>
            ))}
        </div>
        </>
    )
}

export default BookList