import React from 'react'
import Header from '../components/Header'
import '../styles/BookDetails.css'


function BookDetails() {
  return (
    <div><Header/>
    <div className='main'>
        <p className='title'>Book Details</p>
        <div className='bookDetails'>
        <table className="table table-bordered">
        <thead>
    <tr>
        <th scope="col" style={{ width: '20%' }}>Item</th>
        <th scope="col">Details</th>
    </tr>
</thead>

  <tbody>
    <tr>
     
      <td>Book Name</td>
      <td>...</td>
      </tr>
    <tr>
     
      <td>Author Name</td>
      <td>...</td>
      </tr>
    <tr>
     
      <td>Language</td>
      <td>...</td>
      </tr>
    <tr>
     
      <td>Serial No</td>
      <td>...</td>
      </tr>
     
    
  </tbody>
</table>
<h5 className='issueStatus'>Issue Status :</h5>   <div className='issueText'><span>Issued </span><button className='statusBtn'>View Details</button>
    </div>
    <div className='issueText' style={{display : 'hidden'}}><span> Not Issued </span>
    </div>
        
        <button type="submit" className="btn btn-primary" > EDIT</button>
        <button type="submit" className="btn btn-danger" > DELETE</button>
        </div>
        

    </div>
    </div>
  )
}

export default BookDetails