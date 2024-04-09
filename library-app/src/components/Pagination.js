import React from 'react';

function Pagination({ totalBooks, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalBooks / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div  style={{margin:'20px 40%'}}>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
        </li>
      </ul>
    </div>
  );
}

export  default Pagination;
