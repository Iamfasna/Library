import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/AddBook.css';
import Axios from 'axios';
import { useForm } from "react-hook-form";

function AddStudent() {
  const {
    register,
    addBook,
    formState: { errors },
  } = useForm();
  
    const [studentName, setName] = useState('');
    const [className, setClass] = useState('');
    const [division, setDivision] = useState('');
    const [admissionNo, setAdNo] = useState('');
    const [gender, setGender] = useState('');
  
  
    const addStudent = async (e) => {
      e.preventDefault();
      await Axios.post('http://localhost:5000/addStudent', {
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="mb-4">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Class
              </label>
              <input
                type="Number"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="class" required
                onChange={(e) => { setClass(e.target.value) }}

              />
            </div>
            <div className="mb-4">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Division
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="division" required
                onChange={(e) => { setDivision(e.target.value) }}
              />
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
  {...register("number", {
    required: "Required",
    pattern: {
      value: /^[0-9]+$/,
      message: "Invalid admission number"
    }
  })}
  onChange={(e) => { setAdNo(e.target.value) }}
/>
{errors.number && errors.number.message}

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