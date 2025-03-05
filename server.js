import express from 'express';
import { appendFileSync, readFileSync, existsSync } from 'node:fs';

const app = express();
const PORT = 3000;
const FILE_PATH = "books.txt";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body;
    let result = {success: "false"}; //default for easier returning values

    if (!bookName || !isbn || !author || !yearPublished) { //check if the strings are valid
        console.log("Unsuccessfully Added Book: Invalid strings or inputs. \n"); //for checking
        return res.json(result);
        }

    let existingBooks = ''; 
    if (existsSync(FILE_PATH)) { //check if the file exists (to avoid errors when running the server with no inputs yet)
        existingBooks = readFileSync(FILE_PATH, 'utf8'); 
    }

    if (existingBooks.includes(`${isbn}`)) { //check if the isbn is already in the books.txt | ensures uniqueness 
        console.log(`Unsuccessfully Added Book: A book with ISBN ${isbn} already exixts. \n`); //for checking
        return res.json(result);
    }

    //try-catch in appending to the books.txt
    try {
        const bookEntry = `${bookName},${isbn},${author},${yearPublished}\n`;
        appendFileSync(FILE_PATH, bookEntry);   
    } catch (err) {
        console.log(result);
        console.log("Unsuccessfully Added Book: Something went wrong \n");
        return;
    }

    //set as true once all conditions are checked
    result.success = true;
    console.log(`Successfully Added Book: ${bookName}, ${isbn}, ${author}, ${yearPublished} \n`); //for checking
    return res.json(result);
});

app.get('/find-by-isbn-author', (req, res) => {

    console.log("Received query", req.query); //for checking 

    let bookFound = []; //storage ng magiging match
    const existingBooks = readFileSync(FILE_PATH, 'utf8');
    let books = existingBooks.split('\n'); //divide into array of strings (book1, book2, etc.)

    //loop through the books then find the matches
    for(let i = 0; i < books.length; i++){
        let bookDetails = books[i].split(','); //divides the array of strings per "detail" (name, isbn, etc.)

        //turned it to an object
        let book = {
            bookName: bookDetails[0],
            isbn: bookDetails[1],
            author: bookDetails[2],
            yearPublished: bookDetails[3]
        };

        //check if the details matches the one on the query
        if(book.isbn === req.query.isbn && book.author === req.query.author){
            bookFound.push(book); //add it to the storage
        }
    }

    return res.json(bookFound); //to return to the web server created
});

app.get('/find-by-author', (req, res) => {

    console.log("Received query", req.query); //for checking

    let bookFound = [];
    const existingBooks = readFileSync(FILE_PATH, 'utf8');
    let books = existingBooks.split('\n'); //divide into array of strings (book1, book2, etc.)

    //loop through the books then find the matches
    for(let i = 0; i < books.length; i++){
        let bookDetails = books[i].split(','); //divides the array of strings per "detail" (name, isbn, etc.) 
        if (bookDetails.length < 4){
            continue
        }

        //turned it to an object
        let book = {
            bookName: bookDetails[0],
            isbn: bookDetails[1],
            author: bookDetails[2],
            yearPublished: bookDetails[3]
        };

        //check if the details matches the one on the query        
        if(book.author === req.query.author){
            bookFound.push(book); //add it to the storage
        }
    }

    return res.json(bookFound); //to return to the web server created
});


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
