import React from 'react';
import '../styles/AddBook.css'
import Header from '../components/Header';

function AddBook() {
  return (
    <div>
      <Header />
      <div className='addform'>
        <div className='title'>Add Book</div>
        <form>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Name" name='bookName' />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Author</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Author" name='author' />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Language</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Language" name='language' />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Serial No</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="1234..." name='serialNo' />
          </div>
          <button type="submit" className="btn btn-primary" > Submit</button>
        </form>
      </div>
    </div >
  );
}

export default AddBook;
