import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import '../styles/BookIssue.css';
import BookHeader from "../components/BookHeader";
import IssuedBooksTable from "../components/IssuedBooksTable";



function BookIssueClone() {
  const [student, setStudent] = useState({})
  const { admissionNo } = useParams();

  useEffect(() => {
    if (admissionNo) {
      axios.get(`http://localhost:5000/bookIssue/${admissionNo}`)
        .then(response => {
          setStudent(response.data)
        })
        .catch(error => {
          console.error('error fetching admission no', error)
        })

    }

  }, [admissionNo])


  return (
    <div>
      <Header />
      <div className='title'>Book Issue</div>
      <div className="row">
        <div className="col">
          <p>Student Name: {student.studentName}</p>
        </div>
        <div className="col">
        <p>Class: {student.className} {student.division}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>Admission No: {student.admissionNo}</p>
        </div>
        <div className="col">
          <p>Gender: {student.gender}</p>
        </div>
      </div>
      <BookHeader />
      <IssuedBooksTable student={student} />
    </div>
  );
}

export default BookIssueClone;