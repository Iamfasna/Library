import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/AddBook.css';
import Axios from 'axios';
import { apiurl } from '../config';
//import { useForm } from "react-hook-form";

function AddStudent() {
  // const {
  //   register,
  //   addBook,
  //   formState: { errors },
  // } = useForm();

  const [studentName, setName] = useState('');
  const [className, setClass] = useState('');
  const [division, setDivision] = useState('');
  const [admissionNo, setAdNo] = useState('');
  const [gender, setGender] = useState('');


  const addStudent = async (e) => {
    e.preventDefault();
    await Axios.post(apiurl +'/addStudent', {
      studentName,
      className,
      division,
      admissionNo,
      gender
    })
    window.location.reload(false);
  }
  return (
    <div>
      <Header />
      <div className="addform">
        <div className="title">Add Student</div>
        <form onSubmit={addStudent}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label" >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Name" required
              onChange={(e) => { setName(e.target.value) }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width :"100%",margin:"auto"}}>
            <div className="w-50" style={{margin:"1.5rem" , maxWidth:"300px"}}>
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Class
              </label>
              <select className="form-select" required id="classSelect" onChange={(e) => { setClass(e.target.value) }}>
              <option value="">Select class</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            </div>
            <div className="w-50" style={{margin:"1.5rem " , maxWidth:"300px"}}>
              <label htmlFor="formGroupExampleInput2" className="form-label" >
                Division
              </label>
              <select className="form-select" required id="divisionSelect" onChange={(e) => { setDivision(e.target.value) }}>
              <option value="">Select division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Admission No
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="123.."
        
             onChange={(e) => { setAdNo(e.target.value) }}
            />            
          </div>
          <div className="mb-3">
            <label htmlFor="genderSelect" className="form-label">
              Gender
            </label>
            <select className="form-select" required id="genderSelect" onChange={(e) => { setGender(e.target.value) }}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </form>
      </div >
    </div >
  );
}

export default AddStudent;