// IssuedBooksTable.js
import React from 'react';

function IssuedBooksTable({ student }) {
  const issuedBooks = student.issuedBooks || []
  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Book Name</th>
            <th>Serial No</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.map((book, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{book.bookName}</td>
              <td>{book.serialNo}</td>
              <td>{new Date(book.issueDate).toLocaleDateString()}</td>
              <td>{new Date(new Date(book.issueDate).getTime() + (15 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-primary">Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IssuedBooksTable;
