const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();
const adminModel = require('./Schema/admin');
const bookModel = require('./Schema/book');
const studentModel = require('./Schema/student');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser())
const JWT_SECRET = 'your-secret-key';


mongoose.connect('mongodb+srv://libraryproject:library123@cluster0.cgbtbyi.mongodb.net/librarydata?retryWrites=true&w=majority')

const verifyUser = (req,res,next) => {
  const token =req.cookies.token
  if(!token){
    return res.status(401).json({ success: false, error: 'Token not available' });
  }else {
    jwt.verify(token,JWT_SECRET,(err,decoded) =>{
      if (err) return res.status(401).json({ success: false, error: 'Invalid token' });
      req.userId = decoded.userId;
      next()
    })
}}

//adding book


app.post('/addBook', async function (req, res) {
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

app.get('/bookIssue/:admissionNo', async function (req, res) {
    const admissionNo = req.params.admissionNo;
    console.log(admissionNo)

    if (!admissionNo) {
        return res.status(400).send('Student ID is required');
    }
    try {
        const student = await studentModel.findOne({ admissionNo: admissionNo });
        if (!student) {
            return res.json(null);
        }

        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch student details');
    }
});

app.get('/bookHeader/:serialNo/:admissionNo', async function (req, res) {
    const serialNo = req.params.serialNo;
    const admissionNo = req.params.admissionNo;

    try {
        const book = await bookModel.findOne({ serialNo: serialNo });
        if (!book) {
            return res.json(null);
        } else {
            const student = await studentModel.findOne({ admissionNo: admissionNo });
            // Check if student exists
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            // Check if student.issuedBooks exists, if not, create it
            if (!student.issuedBooks) {
                student.issuedBooks = {};
            }
            const newBook = {
                bookName: book.bookName,
                serialNo: book.serialNo,
                issueDate: new Date() // Use current date and time
            };
            student.issuedBooks.push(newBook);
            await student.save();
            book.issueStatus = "yes";
            book.admissionNo = admissionNo;
            await book.save();
        }
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch book details');
    }
});
app.get('/returnBook/:serialNo/:admissionNo', async function (req, res) {
    const serialNo = req.params.serialNo;
    const admissionNo = req.params.admissionNo;

    try {
        const book = await bookModel.findOne({ serialNo: serialNo });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const student = await studentModel.findOne({ admissionNo: admissionNo });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Find the index of the book to be returned in student's issuedBooks array
        const index = student.issuedBooks.findIndex((issuedBook) => issuedBook.serialNo === serialNo);

        if (index === -1) {
            return res.status(404).json({ error: 'Book not issued to student' });
        }

        // Remove the book from student's issuedBooks array
        student.issuedBooks.splice(index, 1);

        // Save the updated student document
        await student.save();

        // Update book's issueStatus to "No" and remove the admissionNo
        book.issueStatus = "No";
        book.admissionNo = null;
        await book.save();

        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to return book');
    }
});



app.listen(5000, () => {
    console.log('Server is running');
})


