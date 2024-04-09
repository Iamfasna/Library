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

        // // Redirect the client to the specified URL
        // res.redirect('http://localhost:3000/addBook');
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

app.get('/bookHeader/:serialNo', async function (req, res) {
    const serialNo = req.params.serialNo;

    try {
        const book = await bookModel.findOne({ serialNo: serialNo });
        if (!book) {
            return res.json(null);
        }
        res.json(book);
    } catch (err) {
        res.status(500).send('Failed to fetch book details')
    }
})


app.listen(5000, () => {
    console.log('Server is running');
})


