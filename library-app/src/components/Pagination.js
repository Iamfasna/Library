import React from 'react'

function Pagination({ books, pageSize, onPageChange }) {
  const totalPages = Math.ceil(books.length / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ margin: '20px 45%' }}>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="/adminHome" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pageNumbers.map((page) => (
          <li className="page-item" key={page}>
            <a className="page-link" href="/adminHome" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="/adminHome" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination