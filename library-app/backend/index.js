require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const adminModel = require('./Schema/admin');
const bookModel = require('./Schema/book');
const studentModel = require('./Schema/student');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const _dirname = path.dirname("")
const buildpath =path.join(_dirname,"../build")
app.use(express.static(buildpath))

app.use(cors({
    origin: ["http://3.6.171.18"],
    methods: ["GET", "POST"],
    credentials: true
}));

// path.join(_dirname,"../build/index.html")

app.use(cookieParser())
const JWT_SECRET = process.env.JWT_SECRET;


mongoose.connect(process.env.MONGODB_URI)



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


const api = express.Router();





// Server-Side


api.post('/', async function(req, res) {
    const { email, password } = req.body;
    try {
        // console.log(password)
        // const pass = await bcrypt.hash(password,10);
        // console.log(pass,'hi')
        const loggedInAdmin = await adminModel.findOne({ loggedIn: true });
        if (loggedInAdmin) {
            return res.status(401).json({ success: false, error: 'Another admin is already logged in' });
        }
  
        const user = await adminModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        
        const checkPass = await bcrypt.compare(password,user.password)
       
        if (!checkPass) {
           
            return res.status(401).json({ success: false, error: 'Incorrect password' });
        }
  
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
        user.loggedIn = true; // Set loggedIn flag
        await user.save();
        res.cookie("token", token)
        res.json({ user, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve books');
    }
  });
  api.get('/adminHome', async function(req, res) {
    try {
        const books = await bookModel.find({});
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve books');
    }
});
  api.get('/adminName',verifyUser, async function(req, res) {
    try {
      const admin = await adminModel.findById(req.userId);
      console.log(admin)
      if (!admin) {
        return res.status(404).json({ success: false, error: 'Admin not found' });
      }
      res.json({ adminName: admin.adminName, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to retrieve admin name');
    }
    });
  
  api.post('/logout', async function(req, res) {
    try {
        const user = await adminModel.findOne({ loggedIn: true });
        if (user) {
            user.loggedIn = false;
            await user.save();
        }
        res.clearCookie('token').sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to logout');
    }
  });
  


//add book


api.post('/addBook', async function (req, res) {
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


//Add Student

api.post('/addStudent', async function(req, res) {
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


//Search Book

api.get('/searchBooks', async function(req, res) {
    try {
        const query = req.query.query;
        // Using a case-insensitive regex to search for books by name, author, or serial number
        const books = await bookModel.find({
            $or: [
                { bookName: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
                { serialNo: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to search books');
    }
});


//Book details

api.get('/bookDetails/:id', async function(req, res) {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve book details');
    }
});


//Edit book

api.get('/editBook/:id', async function(req, res) {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve book details');
    }
});

api.post('/editBook/:id', async function(req, res) {
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

//Delete book


api.post('/deleteBook/:id', function(req, res) {
    const bookId = req.params.id;
    bookModel.deleteOne({ _id: bookId })
      
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });




//Book Issue



api.get('/bookIssue/:admissionNo', async function (req, res) {
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

api.get('/bookHeader/:serialNo/:admissionNo', async function (req, res) {
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



// Return Book


api.get('/returnBook/:serialNo/:admissionNo', async function (req, res) {
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












api.get('/bookIssue/:admissionNo', async function (req, res) {
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

api.get('/bookHeader/:serialNo/:admissionNo', async function (req, res) {
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
api.get('/returnBook/:serialNo/:admissionNo', async function (req, res) {
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

app.use("/api", api);
app.get("*", (req, res) => res.sendFile("index.html", {root: buildpath}))

const PORT=process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server is running');
})




