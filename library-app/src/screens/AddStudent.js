import React from 'react';
import Header from '../components/Header';
import '../styles/AddStudent.css';

function AddStudent() {
  return (
    <div>
      <Header />
      <div className="addform">
        <div className="title">Add Student</div>
        <form>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              style={{ width: '700px' }}
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Class
            </label>
            <input
              type="text"
              style={{ width: '700px' }}
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="class"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Admission No
            </label>
            <input
              type="text"
              style={{ width: '700px' }}
              className="form-control"
              id="formGroupExampleInput"
              placeholder="123.."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genderSelect" className="form-label">
              Gender
            </label>
            <select className="form-select" id="genderSelect">
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
      </div>
    </div>
  );
}

export default AddStudent;
