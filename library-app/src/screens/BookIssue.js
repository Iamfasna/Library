import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import '../styles/BookIssue.css';
import BookHeader from "../components/BookHeader";
import Axios from 'axios';


function BookIssue() {
  const [admissionNo, setadmissionNo] = useState('');
  const navigate = useNavigate();

  function bookIssueCheck() {
    Axios.get(`http://localhost:5000/bookIssue/${admissionNo}`)
      .then(response => {
        if (response.data === null) {
          alert("Enter valid No");
          window.location.reload(false);
        } else {
          navigate(`/bookIssueclone/${admissionNo}`);
        }
      })
      .catch(error => {
        console.error(error);
        // Handle other errors if needed
      });
  }

  return (
    <div>
      <Header />
      <div className='title'>Book Issue</div>
      <div className="row">
        <div className="col">
          <p>Student Name :</p>
        </div>
        <div className="col">
          <p>Class :</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>Admission No :</p>
        </div>
        <div className="col">
          <p>Gender :</p>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col1">
          <input type="number" className="form-control input" placeholder="Enter Admission No" style={{ width: '300px' }} onChange={(e) => { setadmissionNo(e.target.value) }} />

          < button onClick={bookIssueCheck} type="submit" className="btn">Submit</button>

        </div>
      </div>
      <BookHeader />
    </div >
  );
}

export default BookIssue;