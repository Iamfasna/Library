import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import '../styles/BookDetails.css'
import { useParams } from 'react-router'
 import Axios from 'axios';
// import { Client } from 'undici-types';


function BookDetails() {
  const {id} = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    Axios.get(`http://localhost:5000/boookDetails/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);


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
      <td>{book.bookName}</td>
      </tr>
    <tr>
     
      <td>Author Name</td>
      <td>{book.author}</td>
      </tr>
    <tr>
     
      <td>Language</td>
      <td>{book.language}</td>
      </tr>
    <tr>
     
      <td>Serial No</td>
      <td>{book.serialNo}</td>
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

export default BookDetails;