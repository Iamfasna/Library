import React from 'react'


function SubHeader() {
  return (
    <div>
        <div className=" d-flex m-5 justify-content-between" style={{background:"#509091"}}>
            <div className=" d-flex w-70%">
            <div className='p-2'>
            <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
          <input type="search" className="form-control" style={{width :"98%"}} placeholder="Search..." aria-label="Search"/>          
        </form>
        </div>
       
        <div className='p-2'>
        <button type="button" className="btn btn-secondary ms-2">Search</button>
         </div>
            </div>
       
        

        <div className="p-2 ml-10" >
              <button type="button" className="btn btn-secondary">Add Book</button>
        </div>
      </div>
    </div>
  )
}

export default SubHeader