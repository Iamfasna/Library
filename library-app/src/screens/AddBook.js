import React, { useState } from 'react';
import '../styles/AddBook.css'
import Header from '../components/Header';
import Axios from 'axios';



function AddBook() {
  const [bookName, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLang] = useState('');
  const [serialNo, setNo] = useState('');


  const addBook = async (e) => {
    e.preventDefault();
    await Axios.post('http://localhost:5000/addBook', {
      bookName,
      author,
      language,
      serialNo
    })
    window.location.reload(false);
  }


  return (
    <div>
      <Header />
      <div className='addform'>
        <div className='title'>Add Book</div>
        <form onSubmit={addBook}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder='Name' required onChange={(e) => { setName(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Author</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Author" required onChange={(e) => { setAuthor(e.target.value) }} />
          </div>
         
          <div className=" mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Language</label>
            <select className="form-select" id="selectLanguage" value={language} onChange={(e) => { setLang(e.target.value) }}>
  <option value="">Select Language</option>
  <option value="English">English</option>
  <option value="Malayalam">Malayalam</option>
  <option value="Arabic">Arabic</option>
  <option value="Sanskrit">Sanskrit</option>
  <option value="French">French</option>
</select>

          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Serial No</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="1234..." required onChange={(e) => { setNo(e.target.value) }} />
          </div>
          <button type="submit" className="btn btn-primary"> Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;