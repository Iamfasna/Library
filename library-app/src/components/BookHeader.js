import React from 'react';
import '../styles/Header.css';

function BookHeader() {
  return (
    <div>
      <div className="d-flex  justify-content-between mt-4 " style={{ background: "#509091" }}>
        <form className="d-flex">
          <div className="col-auto ">
            <input type="search" className="form-control mt-3" placeholder="Enter Serial No" aria-label="Search" />
          </div>
          <button style={{ width: '100px' }} type="button" className="btn btn-primary px-2 py-1 ms-2" > ADD BOOK</button>
        </form>
      </div>
    </div >
  );
}

export default BookHeader;
