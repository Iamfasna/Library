import React from 'react';

function IssuedBooksTable() {
  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Book Name</th>
            <th>Issued Date</th>
            <th>Due</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Book 1</td>
            <td>Author 1</td>
            <td>2024-04-05</td>
            <td >
              <button className="btn btn-primary">Return</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Book 2</td>
            <td>Author 2</td>
            <td>2024-04-06</td>
            <td>
              <button className="btn btn-primary"> Return</button>
            </td>
          </tr>
          {/* Add more rows for additional issued books */}
        </tbody>
      </table >
    </div >
  );
}

export default IssuedBooksTable;


