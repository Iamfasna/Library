import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom'

function IssuedBooksTable({ student }) {
  const issuedBooks = student.issuedBooks || [];
  const [serialNo, setSerialNo] = useState('');
  const { admissionNo } = useParams();

  const returnClick = async (serialNo) => {
    try {
      const response = await Axios.get(`http://localhost:5000/returnBook/${serialNo}/${admissionNo}`);
      if (response.data === null) {
        alert("Enter valid Serial No");
        // Clear input field
        setSerialNo('');
      } else {
        // Reload the page to reflect the updated list of issued books
        window.location.reload(false);
      }
    } catch (error) {
      console.error(error);
      // Handle other errors if needed
    }
  };

  return (
    <div className="container mt-4">
      <table className="table">
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Book Name</th>
            <th>Serial No</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {issuedBooks.map((book, index) => {
            const issueDate = new Date(book.issueDate);
            const dueDate = new Date(issueDate.getTime() + (15 * 24 * 60 * 60 * 1000)); // 15 days after issue
            const currentDate = new Date();

            let colorClass = '';
            if (dueDate < currentDate) {
              colorClass = 'text-danger'; // overdue, highlight in red
            } else {
              colorClass = 'text-success'; // due in the future, highlight in green
            }

            return (
              <tr className='text-center align-middle' key={index}>
                <td>{index + 1}</td>
                <td>{book.bookName}</td>
                <td>{book.serialNo}</td>
                <td>{issueDate.toLocaleDateString()}</td>
                <td className={colorClass}>{dueDate.toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => returnClick(book.serialNo)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default IssuedBooksTable;
