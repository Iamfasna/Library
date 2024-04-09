const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const adminModel = require('./Schema/admin');
const bookModel = require('./Schema/book');
const studentModel = require('./Schema/student');

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://libraryproject:library123@cluster0.cgbtbyi.mongodb.net/librarydata?retryWrites=true&w=majority')

//adding book

app.post('/addBook', async function(req, res) {
    if (!req.body.bookName || !req.body.author || !req.body.language || !req.body.serialNo) {
        return res.status(400).send('All fields are required');
    }
    var bookData = new bookModel({
        bookName: req.body.bookName,
        author: req.body.author,
        language: req.body.language,
        serialNo: req.body.serialNo
    });
    try {
        await bookData.save();
        res.json();
    } catch (err) {
        // Handle any errors that occur during the save operation
        console.error(err);
        res.status(500).send('Failed to add book');
    }
});

app.post('/editBook/:id', async function(req, res) {
    try {
        if (!req.body.bookName || !req.body.author || !req.body.language || !req.body.serialNo) {
            return res.status(400).send('All fields are required');
        }
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        book.bookName = req.body.bookName;
        book.author = req.body.author;
        book.language = req.body.language;
        book.serialNo = req.body.serialNo;
        await book.save();
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update book');
    }
});


app.get('/adminHome', async function(req, res) {
    try {
        const books = await bookModel.find({});
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve books');
    }
});


app.post('/deleteBook/:id', function(req, res) {
    const bookId = req.params.id;
    bookModel.deleteOne({ _id: bookId })
      
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });


app.get('/bookDetails/:id', async function(req, res) {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve book details');
    }
});

app.get('/editBook/:id', async function(req, res) {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve book details');
    }
});


app.post('/addStudent', async function(req, res) {
    if (!req.body.studentName || !req.body.className || !req.body.division || !req.body.admissionNo || !req.body.gender) {
        return res.status(400).send('All fields are required');
    }
    var studentData = new studentModel({
        studentName: req.body.studentName,
        className: req.body.className,
        division: req.body.division,
        admissionNo: req.body.admissionNo,
        gender: req.body.gender
    });
    try {
        await studentData.save();
        res.json();
    } catch (err) {
        // Handle any errors that occur during the save operation
        console.error(err);
        res.status(500).send('Failed to add student');
    }
});


app.listen(5000,()=>{
    console.log('Server is running');
})


