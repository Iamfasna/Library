import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import '../styles/BookIssue.css';
import BookHeader from "../components/BookHeader";
import Axios from 'axios';
import { apiurl } from "../config";


function BookIssue() {
  const [admissionNo, setadmissionNo] = useState('');
  const navigate = useNavigate();

  function bookIssueCheck() {
    Axios.get(`${apiurl}/bookIssue/${admissionNo}`)
      .then(response => {
        if (response.data === null) {
          alert("No Student found");
          navigate(`/addStudent`)
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
      <div className='title'>Issue/Receive Book</div>
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
      <div className="d-flex align-items-center mx-3">
        <div className="">
          <input type="text" inputmode="numeric" className="form-control input" placeholder="Enter Admission No" style={{ width: '300px',height:"40px" }} onChange={(e) => { setadmissionNo(e.target.value) }} />
          </div>
<div className="mx-5">
< button onClick={bookIssueCheck} type="submit" className="btn btn-secondary">Submit</button>
</div>
          
      </div>
      <BookHeader />
    </div >
  );
}

export default BookIssue;