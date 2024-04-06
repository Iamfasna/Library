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
    // if (!req.body.bookName || !req.body.author || !req.body.language || !req.body.serialNo) {
    //     return res.status(400).send('All fields are required');
    // }
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


//adding student

//studentName,
    //     class,
    //     division,
    //     admissionNo,
    //     gender

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


