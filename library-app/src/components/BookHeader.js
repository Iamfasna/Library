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
        <div className="d-flex mx-auto my-4 align-items-center px-4 rounded-2"style={{background:"rgba(80, 144, 145, .6)",width:"95%",height:"60px"}}>
        <form className="d-flex">
          <div className="col-auto ">
            <input type="search" className="form-control mt-3" placeholder="Enter Serial No" aria-label="Search" onChange={(e) => { setSerialNo(e.target.value) }} />
          </div>
          <button style={{ width: '100px',height:"34px" }} type="button" className="btn btn-secondary px-2 py-1 ms-4" onClick={handleAddbook} > ADD BOOK</button>
        </form>
      </div>
    </div>
  )
}


export default BookHeader;
