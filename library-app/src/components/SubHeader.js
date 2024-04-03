import React from 'react'


function SubHeader() {
  return (
    <div>
        <div className="container d-flex flex-wrap justify-content-center">
            <div className=''>
            <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
          <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>          
        </form>
        <button type="button" className="btn btn-primary">Add Book</button>
            </div>
        

        <div className="text-end">
          
          <button type="button" className="btn btn-primary">Add Book</button>
        </div>
      </div>
    </div>
  )
}

export default SubHeader