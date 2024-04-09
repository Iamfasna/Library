import React from 'react'


function SubHeader() {
  return (
    <div>
        <div className="d-flex mx-auto my-4 justify-content-between align-items-center px-4 rounded-2" style={{background:"rgba(80, 144, 145, .6)",width:"95%",height:"70px"}}>
           <div className="d-flex align-items-center">
          <input type="search" className="form-control" style={{width :"20rem"}} placeholder="Search..." aria-label="Search"/>          
        </div>
         <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Actions
  </a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Add Book</a></li>
    <li><a class="dropdown-item" href="#">Recive Book</a></li>
    <li><a class="dropdown-item" href="#">Issue Book</a></li>
  </ul>
</div>
      </div>
    </div>
  )
}

export default SubHeader