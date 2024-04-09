import React, { useState } from 'react';
import '../styles/Header.css';
import Axios from 'axios';
import { useParams } from 'react-router-dom'

function BookHeader() {
  const [serialNo, setSerialNo] = useState('');
  const { admissionNo } = useParams();

  function handleAddbook() {
    Axios.get(`http://localhost:5000/bookHeader/${serialNo}/${admissionNo}`)
      .then(response => {
        if (response.data === null) {
          alert("Enter valid Serial No");
          // Clear input field
          setSerialNo('');
        } else {
          window.location.reload(false);
        }
      })
      .catch(error => {
        console.error(error);
        // Handle other errors if needed
      });
  }


  return (
    <div>
      <div className="d-flex  justify-content-between mt-4 " style={{ background: "#509091" }}>
        <form className="d-flex">
          <div className="col-auto ">
            <input type="search" className="form-control mt-3" placeholder="Enter Serial No" aria-label="Search" onChange={(e) => { setSerialNo(e.target.value) }} />
          </div>
          <button style={{ width: '100px' }} type="button" className="btn btn-primary px-2 py-1 ms-2" onClick={handleAddbook} > ADD BOOK</button>
        </form>
      </div>
    </div>
  )
}


export default BookHeader;
