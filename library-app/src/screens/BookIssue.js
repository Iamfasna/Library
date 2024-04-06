import React from "react";
import Header from "../components/Header";
import '../styles/BookIssue.css';
import BookHeader from "../components/BookHeader";



function BookIssue() {
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
          <input type="number" className="form-control input" placeholder="Enter Admission No" style={{ width: '300px' }} />
          < button type="submit" className="Btn">Submit</button>
        </div>
      </div>
      <BookHeader />
    </div >
  );
}

export default BookIssue;